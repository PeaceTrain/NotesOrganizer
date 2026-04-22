import { describe, expect, it } from "vitest";

describe("search api", () => {
  it("has keyword mode", () => {
    const url = new URL("http://localhost/api/search?q=math&mode=keyword");
    expect(url.searchParams.get("mode")).toBe("keyword");
  });
});
