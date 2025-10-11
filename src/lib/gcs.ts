import { Storage } from "@google-cloud/storage";

const gcpCredentials = {
  type: "service_account",
  project_id: process.env.PROJECT_ID,
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
};
const storage = new Storage({
  credentials: gcpCredentials,
  projectId: process.env.GCP_PROJECT_ID,
});

export const bucket = storage.bucket(process.env.GCP_BUCKET_NAME!);

export const getSignedUploadUrl = async (filename: string) => {
  const file = bucket.file(filename);

  const [url] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: "application/octet-stream",
  });

  return url;
};
