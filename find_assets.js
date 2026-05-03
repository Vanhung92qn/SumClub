const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 2) {
    console.log('Usage: node find_assets.js <target> <allowed_bundle>');
    process.exit(1);
}

const projectRoot = __dirname;
const assetsRoot = path.join(projectRoot, 'assets');

const targetPath = path.resolve(projectRoot, args[0]);
const bundlePath = path.resolve(projectRoot, args[1]);

const usedUUIDs = new Set();
const uuidToFile = {};
const scattered = new Set();


// ===============================
// READ UUID FROM FILE
// ===============================
function findUUIDsInFile(filePath) {
    try {
        console.log('--- Đang đọc file:', filePath);

        const content = fs.readFileSync(filePath, 'utf8');

        // bắt mọi uuid (__uuid__ hoặc uuid)
        const regex = /"(__uuid__|uuid)"\s*:\s*"([^"]+)"/g;

        let match;
        while ((match = regex.exec(content)) !== null) {
            usedUUIDs.add(match[2]);
        }

    } catch (e) {
        console.log('Không đọc được:', filePath);
    }
}


// ===============================
// SCAN TARGET
// ===============================
function scanTarget(target) {

    if (!fs.existsSync(target)) return;

    const stat = fs.statSync(target);

    if (stat.isDirectory()) {

        const files = fs.readdirSync(target);

        for (const file of files) {
            scanTarget(path.join(target, file));
        }

    } else {

        if (
            target.endsWith('.prefab') ||
            target.endsWith('.fire') ||
            target.endsWith('.anim')
        ) {
            findUUIDsInFile(target);
        }
    }
}


// ===============================
// BUILD UUID MAP FROM META
// ===============================
function buildUuidMap(dir) {

    const files = fs.readdirSync(dir);

    for (const file of files) {

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            buildUuidMap(fullPath);
            continue;
        }

        if (!fullPath.endsWith('.meta')) continue;

        try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const actualFile = fullPath.replace(/\.meta$/, '');

            // map ALL uuid including subMetas
            const regex = /"uuid"\s*:\s*"([^"]+)"/g;
            let match;

            while ((match = regex.exec(content)) !== null) {
                uuidToFile[match[1]] = actualFile;
            }

        } catch (e) {}
    }
}


// ===============================
// MAIN
// ===============================
console.log(`[1] Đang đọc các file trong: ${targetPath}`);
scanTarget(targetPath);

console.log(`    -> Tìm thấy ${usedUUIDs.size} mã UUID đang được sử dụng.`);

console.log('[2] Đang quét toàn bộ file .meta...');
buildUuidMap(assetsRoot);


// ===============================
// CHECK OUTSIDE BUNDLE
// ===============================
const normalizedBundle =
    bundlePath.replace(/\\/g, '/').toLowerCase();

for (const uuid of usedUUIDs) {

    const filePath = uuidToFile[uuid];

    if (!filePath) {
        console.log('UUID KHÔNG MAP ĐƯỢC:', uuid);
        continue;
    }

    const normalizedFile =
        filePath.replace(/\\/g, '/').toLowerCase();

    if (!normalizedFile.startsWith(normalizedBundle)) {
        scattered.add(normalizedFile);
    }
}


// ===============================
// OUTPUT
// ===============================
const outputPath =
    path.join(projectRoot, 'ScatteredAssets_Report.txt');

fs.writeFileSync(
    outputPath,
    Array.from(scattered).join('\n')
);

console.log(`\n[!] HOÀN TẤT! Phát hiện ${scattered.size} file nằm NGOÀI bundle.`);
console.log(`[!] Report: ${outputPath}`);