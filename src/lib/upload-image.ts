import { bucket } from "./gcs";
import sharp from "sharp";

/**
 * Uploads an image to GCP as WebP and returns the public URL.
 * @param file - File object from formData
 */
export async function uploadImageToGCP(file: File): Promise<string> {
  // Convert file to ArrayBuffer
  console.log("file log:", file);
  const arrayBuffer = await file.arrayBuffer();

  // Convert to WebP
  const webpBuffer = await sharp(Buffer.from(arrayBuffer))
    .webp({ quality: 80 }) // adjust quality if needed
    .toBuffer();

  // Create WebP filename
  const webpFilename = file.name.replace(/\.\w+$/, ".webp");

  // Upload to GCP
  const gcsFile = bucket.file(webpFilename);
  await gcsFile.save(webpBuffer, {
    contentType: "image/webp",
  });

  // Return public URL
  return `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/${webpFilename}`;
}
