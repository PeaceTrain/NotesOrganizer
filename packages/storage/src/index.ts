import { Client } from "minio";

export const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT ?? "localhost",
  port: Number(process.env.MINIO_PORT ?? 9000),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY ?? "minio",
  secretKey: process.env.MINIO_SECRET_KEY ?? "minio123"
});

export async function ensureBucket(bucket = process.env.MINIO_BUCKET ?? "inkforge") {
  const exists = await minioClient.bucketExists(bucket);
  if (!exists) {
    await minioClient.makeBucket(bucket, "us-east-1");
  }
}

export async function uploadObject(objectKey: string, data: Buffer, mimeType: string) {
  const bucket = process.env.MINIO_BUCKET ?? "inkforge";
  await ensureBucket(bucket);
  await minioClient.putObject(bucket, objectKey, data, data.length, { "Content-Type": mimeType });
  return { bucket, objectKey };
}
