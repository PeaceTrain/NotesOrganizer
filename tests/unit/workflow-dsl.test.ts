import { describe, expect, it } from "vitest";
import { parseFeatureRequestToWorkflow } from "../../packages/workflows/src";

describe("workflow interpreter", () => {
  it("extracts list append action", () => {
    const proposal = parseFeatureRequestToWorkflow("when I write add to list books, append item");
    expect(proposal.trigger).toBe("command_detected");
    expect(proposal.actions?.some((a) => a.type === "append_to_list")).toBeTruthy();
  });
});
