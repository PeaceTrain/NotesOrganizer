import { describe, expect, it } from "vitest";
import { AIProviderRouter, openAIAdapter, anthropicAdapter, geminiAdapter } from "../../packages/ai/src";

describe("ai provider router", () => {
  it("routes multimodal tasks", () => {
    const router = new AIProviderRouter([openAIAdapter, anthropicAdapter, geminiAdapter]);
    expect(router.forTask("multimodal")).toBeTruthy();
  });
});
