const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const assetsPath = path.join(projectRoot, "assets");

const target = process.argv[2];

if (!target) {
    console.log("Usage:");
    console.log("node find_from_one.js <asset_path>");
    process.exit();
}

const targetPath = path.join(projectRoot, target);

if (!fs.existsSync(targetPath)) {
    console.log("❌ File không tồn tại:", targetPath);
    process.exit();
}

const usedUUIDs = new Set();
const uuidToFile = {};

// =============================
// READ UUID FROM FILE
// =============================
function extractUUID(file) {
    console.log("Reading:", file);

    const content = fs.readFileSync(file, "utf8");

    const regex = /"__uuid__"\s*:\s*"([^"]+)"/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        usedUUIDs.add(match[1]);
    }
}

// =============================
extractUUID(targetPath);

console.log("UUID found:", usedUUIDs.size);

// =============================
// BUILD UUID MAP
// =============================
function buildMeta(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const full = path.join(dir, file);

        if (fs.statSync(full).isDirectory()) {
            buildMeta(full);
        } else if (full.endsWith(".meta")) {

            const content = fs.readFileSync(full, "utf8");
            const regex = /"uuid"\s*:\s*"([^"]+)"/g;

            const assetFile = full.replace(".meta", "");

            let match;
            while ((match = regex.exec(content)) !== null) {
                uuidToFile[match[1]] = assetFile;
            }
        }
    }
}

console.log("Mapping UUID...");
buildMeta(assetsPath);

// =============================
// RESOLVE
// =============================
const dependencies = [];

for (const uuid of usedUUIDs) {
    if (uuidToFile[uuid]) {
        dependencies.push(uuidToFile[uuid]);
    } else {
        console.log("UUID NOT FOUND:", uuid);
    }
}

// =============================
const output = "DEPENDENCY_RESULT.txt";

fs.writeFileSync(
    output,
    dependencies.sort().join("\n")
);

console.log("✅ DONE");
console.log("Dependency:", dependencies.length);
console.log("Saved:", output);