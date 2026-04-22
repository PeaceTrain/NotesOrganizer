export type AICapability =
  | "text_generation"
  | "image_understanding"
  | "structured_extraction"
  | "embeddings"
  | "long_context"
  | "tool_calling";

export interface AIRequest {
  task: string;
  prompt: string;
  input?: Record<string, unknown>;
}

export interface AIResponse {
  text: string;
  structured?: unknown;
}

export interface AIAdapter {
  name: "openai" | "anthropic" | "gemini";
  capabilities: AICapability[];
  run(input: AIRequest): Promise<AIResponse>;
}

class StubAdapter implements AIAdapter {
  constructor(
    public name: "openai" | "anthropic" | "gemini",
    public capabilities: AICapability[]
  ) {}

  async run(input: AIRequest): Promise<AIResponse> {
    return {
      text: `[${this.name}] ${input.task}: ${input.prompt.slice(0, 200)}`,
      structured: input.input
    };
  }
}

export const openAIAdapter = new StubAdapter("openai", [
  "text_generation",
  "image_understanding",
  "structured_extraction",
  "embeddings",
  "tool_calling"
]);

export const anthropicAdapter = new StubAdapter("anthropic", [
  "text_generation",
  "image_understanding",
  "structured_extraction",
  "long_context"
]);

export const geminiAdapter = new StubAdapter("gemini", [
  "text_generation",
  "image_understanding",
  "structured_extraction",
  "embeddings",
  "long_context",
  "tool_calling"
]);

export class AIProviderRouter {
  constructor(private readonly providers: AIAdapter[]) {}

  forTask(task: "summarize" | "extract" | "multimodal" | "embedding") {
    if (task === "embedding") return this.providers.find((p) => p.capabilities.includes("embeddings"));
    if (task === "multimodal") return this.providers.find((p) => p.capabilities.includes("image_understanding"));
    if (task === "extract") return this.providers.find((p) => p.capabilities.includes("structured_extraction"));
    return this.providers.find((p) => p.capabilities.includes("text_generation"));
  }
}
