const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const assetsRoot = path.join(projectRoot, "assets");
const libraryUuidFile = path.join(projectRoot, "library", "uuid-to-mtime.json");

const BUNDLES = [
    "3cay", "777", "aquarium", "bacarat", "baucua", "cowboy",
    "dragontiger", "lode", "maubinh", "minipoker", "poker",
    "shootFish", "taixiu", "taixiumd5", "taixiusieutoc",
    "tienlenMN", "tienlenMNSoLo", "xocxoc"
];

// 1. UUID known via /assets/ meta
const uuidMap = {};
function scanMeta(dir) {
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        const st = fs.statSync(full);
        if (st.isDirectory()) { scanMeta(full); continue; }
        if (!f.endsWith(".meta")) continue;
        const txt = fs.readFileSync(full, "utf8");
        const real = full.replace(".meta", "");
        const re = /"uuid"\s*:\s*"([^"]+)"/g;
        let m; while ((m = re.exec(txt)) !== null) uuidMap[m[1]] = real;
    }
}
console.log("Mapping /assets/ meta UUID...");
scanMeta(assetsRoot);
console.log("indexed:", Object.keys(uuidMap).length);

// 2. UUID known to engine library
const engineUuid = JSON.parse(fs.readFileSync(libraryUuidFile, "utf8"));
console.log("engine UUID:", Object.keys(engineUuid).length);

// 3. Walk prefabs in each bundle, classify "not found in /assets/"
function listPrefabs(dir, out) {
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        const st = fs.statSync(full);
        if (st.isDirectory()) listPrefabs(full, out);
        else if (f.endsWith(".prefab") || f.endsWith(".scene") || f.endsWith(".fire"))
            out.push(full);
    }
}

// Build node-path resolver for one prefab JSON
function buildNodePathFn(prefabArr) {
    const nodes = {};
    prefabArr.forEach((obj, idx) => {
        if (obj && obj.__type__ === "cc.Node") {
            nodes[idx] = { name: obj._name, parent: obj._parent ? obj._parent.__id__ : null };
        }
    });
    return function (id) {
        if (!nodes[id]) return "UNKNOWN";
        let r = []; let c = nodes[id];
        while (c) { r.unshift(c.name); c = nodes[c.parent]; }
        return r.join("/");
    };
}

// Per-UUID: where it's referenced
const missing = new Map(); // uuid -> [{ bundle, prefabRel, nodePath, component }]
const builtin = new Map(); // uuid -> count

for (const bundle of BUNDLES) {
    const prefabs = [];
    listPrefabs(path.join(assetsRoot, bundle), prefabs);

    for (const pf of prefabs) {
        let arr;
        try { arr = JSON.parse(fs.readFileSync(pf, "utf8")); } catch { continue; }
        const getPath = buildNodePathFn(arr);
        const prefabRel = path.relative(projectRoot, pf).replace(/\\/g, "/");

        function visit(obj, ctx) {
            if (!obj || typeof obj !== "object") return;
            if (obj.__uuid__ && typeof obj.__uuid__ === "string") {
                const id = obj.__uuid__;
                if (!uuidMap[id]) {
                    if (engineUuid[id]) {
                        builtin.set(id, (builtin.get(id) || 0) + 1);
                    } else {
                        if (!missing.has(id)) missing.set(id, []);
                        missing.get(id).push({ bundle, prefabRel, ctx });
                    }
                }
            }
            if (Array.isArray(obj)) obj.forEach(v => visit(v, ctx));
            else for (const k of Object.keys(obj)) visit(obj[k], ctx);
        }

        for (const obj of arr) {
            if (obj && obj.__type__ && obj.node && obj.node.__id__ !== undefined) {
                const np = getPath(obj.node.__id__);
                visit(obj, `${np} :: ${obj.__type__}`);
            } else {
                visit(obj, "(root)");
            }
        }
    }
}

// Output
let out = "";
out += `Engine builtin UUID refs (safe — Cocos internal): ${[...builtin.values()].reduce((a,b)=>a+b,0)} refs across ${builtin.size} unique UUIDs\n\n`;
out += `=== TRULY MISSING UUIDs (orphan refs) ===\n`;
out += `Total unique missing: ${missing.size}\n\n`;

const arr = [...missing.entries()].sort((a, b) => b[1].length - a[1].length);
for (const [uuid, refs] of arr) {
    out += `\nUUID: ${uuid}   (${refs.length} refs)\n`;
    const grouped = {};
    for (const r of refs) {
        const key = `${r.bundle} | ${r.prefabRel}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(r.ctx);
    }
    for (const k of Object.keys(grouped).sort()) {
        out += `   ${k}\n`;
        for (const ctx of grouped[k]) out += `       at ${ctx}\n`;
    }
}

const file = path.join(projectRoot, "MISSING_UUID_REPORT.txt");
fs.writeFileSync(file, out);

console.log("\n=== RESULT ===");
console.log("builtin (safe) unique UUIDs :", builtin.size);
console.log("MISSING (orphan)     UUIDs  :", missing.size);
console.log("Saved:", file);
