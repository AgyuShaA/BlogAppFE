// convert-to-webp.js
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Folder to scan
const PUBLIC_FOLDER = path.join(process.cwd(), "public");

// Allowed image extensions to convert
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".webp"];

// Folders to ignore
const IGNORED_FOLDERS = ["email"];

async function convertToWebP(filePath) {
  const webpPath = filePath.replace(path.extname(filePath), ".webp");
  try {
    await sharp(filePath).rotate().webp({ quality: 80 }).toFile(webpPath);
    console.log(`Converted: ${filePath} → ${webpPath}`);
  } catch (err) {
    console.error(`Failed to convert ${filePath}:`, err);
  }
}

async function scanFolder(folder) {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const fullPath = path.join(folder, file);
    const stat = fs.statSync(fullPath);

    // Skip ignored folders
    if (stat.isDirectory() && IGNORED_FOLDERS.includes(file.toLowerCase())) {
      console.log(`Skipping folder: ${fullPath}`);
      continue;
    }

    if (stat.isDirectory()) {
      await scanFolder(fullPath);
    } else if (
      stat.isFile() &&
      ALLOWED_EXTENSIONS.includes(path.extname(fullPath).toLowerCase())
    ) {
      await convertToWebP(fullPath);
    }
  }
}

// Run
scanFolder(PUBLIC_FOLDER)
  .then(() => console.log("All done!"))
  .catch((err) => console.error(err));
