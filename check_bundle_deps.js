const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const assetsRoot = path.join(projectRoot, "assets");

const BUNDLES = [
    "3cay", "777", "aquarium", "bacarat", "baucua", "cowboy",
    "dragontiger", "lode", "maubinh", "minipoker", "poker",
    "shootFish", "taixiu", "taixiumd5", "taixiusieutoc",
    "tienlenMN", "tienlenMNSoLo", "xocxoc"
];

const SHARED_FOLDERS = new Set([
    "common", "lib", "audio", "images", "images_old",
    "fonts", "skeletons", "scenes", "scripts", "lobby",
    "minigame_ui", "migration"
]);

// =============================
// UUID MAP
// =============================
const uuidMap = {};

function scanMeta(dir) {
    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) { scanMeta(full); continue; }
        if (!file.endsWith(".meta")) continue;
        const txt = fs.readFileSync(full, "utf8");
        const real = full.replace(".meta", "");
        const re = /"uuid"\s*:\s*"([^"]+)"/g;
        let m;
        while ((m = re.exec(txt)) !== null) {
            uuidMap[m[1]] = real;
        }
    }
}

console.log("Mapping UUID across /assets/ ...");
scanMeta(assetsRoot);
console.log("UUID indexed:", Object.keys(uuidMap).length);

// =============================
// COLLECT PREFABS PER BUNDLE
// =============================
function listPrefabs(dir, out) {
    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) listPrefabs(full, out);
        else if (file.endsWith(".prefab") || file.endsWith(".scene") || file.endsWith(".fire"))
            out.push(full);
    }
}

// =============================
// CLASSIFY ASSET
// =============================
function classify(assetPath, bundleName) {
    const rel = path.relative(assetsRoot, assetPath).replace(/\\/g, "/");
    const top = rel.split("/")[0];

    if (top === bundleName) return { kind: "OWN" };
    if (top === "resources") return { kind: "RESOURCES_LEFTOVER", rel };
    if (BUNDLES.includes(top)) return { kind: "OTHER_BUNDLE", rel, owner: top };
    if (SHARED_FOLDERS.has(top)) return { kind: "SHARED", rel };
    return { kind: "OTHER", rel };
}

// =============================
// SCAN PREFAB FILE
// =============================
function scanPrefab(file) {
    const txt = fs.readFileSync(file, "utf8");
    const re = /"__uuid__"\s*:\s*"([^"]+)"/g;
    const ids = new Set();
    let m;
    while ((m = re.exec(txt)) !== null) ids.add(m[1]);
    return ids;
}

// =============================
// RUN PER BUNDLE
// =============================
const summary = [];
let bigReport = "";

for (const bundle of BUNDLES) {
    const bundleDir = path.join(assetsRoot, bundle);
    const prefabs = [];
    listPrefabs(bundleDir, prefabs);

    const buckets = {
        OWN: 0,
        SHARED: new Map(),
        OTHER_BUNDLE: new Map(),
        RESOURCES_LEFTOVER: new Map(),
        OTHER: new Map(),
        NOT_FOUND: 0
    };

    const perPrefab = [];

    for (const pf of prefabs) {
        const ids = scanPrefab(pf);
        const issues = { resources: [], otherBundle: [], notFound: [] };

        for (const id of ids) {
            const asset = uuidMap[id];
            if (!asset) { buckets.NOT_FOUND++; issues.notFound.push(id); continue; }
            const c = classify(asset, bundle);
            if (c.kind === "OWN") buckets.OWN++;
            else if (c.kind === "SHARED") {
                buckets.SHARED.set(c.rel, (buckets.SHARED.get(c.rel) || 0) + 1);
            } else if (c.kind === "OTHER_BUNDLE") {
                buckets.OTHER_BUNDLE.set(c.rel, (buckets.OTHER_BUNDLE.get(c.rel) || 0) + 1);
                issues.otherBundle.push(c.rel);
            } else if (c.kind === "RESOURCES_LEFTOVER") {
                buckets.RESOURCES_LEFTOVER.set(c.rel, (buckets.RESOURCES_LEFTOVER.get(c.rel) || 0) + 1);
                issues.resources.push(c.rel);
            } else {
                buckets.OTHER.set(c.rel, (buckets.OTHER.get(c.rel) || 0) + 1);
            }
        }

        if (issues.resources.length || issues.otherBundle.length || issues.notFound.length) {
            perPrefab.push({ pf, issues });
        }
    }

    const resCount = buckets.RESOURCES_LEFTOVER.size;
    const xbCount = buckets.OTHER_BUNDLE.size;

    summary.push({
        bundle,
        prefabs: prefabs.length,
        own: buckets.OWN,
        shared: buckets.SHARED.size,
        leftoverResources: resCount,
        crossBundle: xbCount,
        notFound: buckets.NOT_FOUND
    });

    bigReport += `\n========================================\n`;
    bigReport += `BUNDLE: ${bundle}  (prefabs: ${prefabs.length})\n`;
    bigReport += `  own assets refs   : ${buckets.OWN}\n`;
    bigReport += `  shared refs       : ${buckets.SHARED.size} unique\n`;
    bigReport += `  leftover /resources/ : ${resCount} unique  <--\n`;
    bigReport += `  cross-bundle      : ${xbCount} unique  <--\n`;
    bigReport += `  uuid not found    : ${buckets.NOT_FOUND}\n`;

    if (resCount) {
        bigReport += `\n  >> Asset SÓT trong /resources/:\n`;
        for (const [k, v] of [...buckets.RESOURCES_LEFTOVER.entries()].sort()) {
            bigReport += `     [${v}x] ${k}\n`;
        }
    }
    if (xbCount) {
        bigReport += `\n  >> Asset CROSS-BUNDLE (đang xài bundle khác):\n`;
        for (const [k, v] of [...buckets.OTHER_BUNDLE.entries()].sort()) {
            bigReport += `     [${v}x] ${k}\n`;
        }
    }

    if (perPrefab.length) {
        bigReport += `\n  >> Prefab có vấn đề:\n`;
        for (const { pf, issues } of perPrefab) {
            const rel = path.relative(projectRoot, pf).replace(/\\/g, "/");
            bigReport += `     - ${rel}\n`;
            if (issues.resources.length)
                bigReport += `         resources sót: ${issues.resources.length}\n`;
            if (issues.otherBundle.length)
                bigReport += `         cross-bundle : ${issues.otherBundle.length}\n`;
            if (issues.notFound.length)
                bigReport += `         uuid not found: ${issues.notFound.length}\n`;
        }
    }
}

// =============================
// PRINT SUMMARY
// =============================
console.log("\n=== SUMMARY ===");
console.log("bundle".padEnd(18), "prefabs".padStart(8), "own".padStart(6), "shared".padStart(8), "leftRes".padStart(9), "crossBn".padStart(9), "notFnd".padStart(8));
for (const s of summary) {
    console.log(
        s.bundle.padEnd(18),
        String(s.prefabs).padStart(8),
        String(s.own).padStart(6),
        String(s.shared).padStart(8),
        String(s.leftoverResources).padStart(9),
        String(s.crossBundle).padStart(9),
        String(s.notFound).padStart(8)
    );
}

const out = path.join(projectRoot, "BUNDLE_DEPS_REPORT.txt");
fs.writeFileSync(out, bigReport);
console.log("\nSaved:", out);
