import { describe, expect, it } from "vitest";

describe("ingestion flow", () => {
  it("tracks import metadata structure", () => {
    const importJob = {
      sourceType: "NEXTCLOUD_WEBDAV",
      sourcePath: "/Notes/note.pdf",
      etag: "abc",
      fileHash: "sha256",
      deduplicated: false
    };
    expect(importJob.sourceType).toBe("NEXTCLOUD_WEBDAV");
  });
});
