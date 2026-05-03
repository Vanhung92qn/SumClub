const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const assetsRoot = path.join(projectRoot, "assets");

const prefabArg = process.argv[2];

if (!prefabArg) {
    console.log(
        "Usage:\nnode find_prefab_report.js assets/xxx.prefab"
    );
    process.exit();
}

const prefabPath = path.join(projectRoot, prefabArg);


// =============================
// BUILD UUID MAP
// =============================

console.log("🔎 Mapping UUID...");

const uuidMap = {};

function scanMeta(dir) {

    fs.readdirSync(dir).forEach(file => {

        const full = path.join(dir, file);

        if (fs.statSync(full).isDirectory())
            return scanMeta(full);

        if (!file.endsWith(".meta")) return;

        const txt = fs.readFileSync(full, "utf8");
        const realFile = full.replace(".meta", "");

        const matches =
            txt.matchAll(/"uuid":\s*"([^"]+)"/g);

        for (const m of matches)
            uuidMap[m[1]] = realFile;
    });
}

scanMeta(assetsRoot);


// =============================
// READ PREFAB
// =============================

const prefab = JSON.parse(
    fs.readFileSync(prefabPath, "utf8")
);


// =============================
// BUILD NODE TABLE
// =============================

const nodes = {};

prefab.forEach((obj, index) => {

    if (obj.__type__ === "cc.Node") {

        nodes[index] = {
            name: obj._name,
            parent: obj._parent
                ? obj._parent.__id__
                : null
        };
    }
});


// =============================
// NODE PATH
// =============================

function getNodePath(id) {

    if (!nodes[id]) return "UNKNOWN";

    let result = [];
    let cur = nodes[id];

    while (cur) {
        result.unshift(cur.name);
        cur = nodes[cur.parent];
    }

    return result.join("/");
}


// =============================
// RESULT STORAGE
// =============================

const results = [];


// =============================
// SCAN COMPONENT
// =============================

function scanComponent(component) {

    if (!component.node) return;

    const nodeId = component.node.__id__;
    const nodePath = getNodePath(nodeId);
    const compType = component.__type__;

    function deepScan(obj) {

        if (!obj) return;

        if (obj.__uuid__) {

            const asset = uuidMap[obj.__uuid__];

            // bỏ builtin engine
            if (!asset) return;

            results.push({
                nodePath,
                component: compType,
                asset
            });
        }

        if (Array.isArray(obj))
            obj.forEach(deepScan);
        else if (typeof obj === "object")
            Object.values(obj).forEach(deepScan);
    }

    deepScan(component);
}


// =============================
// RUN
// =============================

console.log("🚀 Scanning prefab...\n");

prefab.forEach(obj => {

    if (
        obj.__type__ &&
        obj.node &&
        obj.node.__id__ !== undefined
    ) {
        scanComponent(obj);
    }
});


// =============================
// EXPORT FILE
// =============================

const outputFile =
    path.join(projectRoot, "PrefabAssetReport.txt");

let output = "";

results.forEach(r => {

    output +=
`====================
Node path : ${r.nodePath}
Component : ${r.component}
Asset     : ${r.asset}

`;
});

fs.writeFileSync(outputFile, output);

console.log("✅ DONE");
console.log("📄 Report:", outputFile);