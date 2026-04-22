import { describe, expect, it } from "vitest";

function detect(rawText: string) {
  const normalized = rawText.toLowerCase();
  const listMatch = normalized.match(/add to (?:a new )?list\s+([a-z0-9\- _]+)/);
  if (listMatch) return `add to list ${listMatch[1].trim()}`;
  return "todo";
}

describe("command detection", () => {
  it("detects list commands", () => {
    expect(detect("Add to list shopping")).toBe("add to list shopping");
  });
});
