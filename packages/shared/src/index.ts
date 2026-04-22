import { z } from "zod";

export const processingStateSchema = z.enum(["PENDING", "PROCESSING", "COMPLETED", "FAILED", "REVIEW_REQUIRED"]);

export const sourceTypeSchema = z.enum(["NEXTCLOUD_WEBDAV", "NEXTCLOUD_WEBHOOK", "MANUAL_UPLOAD", "API"]);

export const commandSchema = z.enum([
  "summarize",
  "extract tasks",
  "markdown",
  "flashcards",
  "calendar",
  "email",
  "translate",
  "explain",
  "todo"
]);

export type ProcessingState = z.infer<typeof processingStateSchema>;

export interface PageView {
  id: string;
  extractedText?: string;
  cleanedText?: string;
}
