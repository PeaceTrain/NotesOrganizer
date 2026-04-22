import { z } from "zod";

export const triggerSchema = z.enum([
  "note_uploaded",
  "page_processed",
  "command_detected",
  "tag_applied",
  "manual_run",
  "nextcloud_file_created",
  "nextcloud_file_updated",
  "list_item_added"
]);

export const actionSchema = z.enum([
  "summarize_note",
  "extract_tasks",
  "classify_page",
  "generate_markdown",
  "create_flashcards",
  "apply_tag",
  "append_to_list",
  "create_synthesized_note",
  "generate_context_cards",
  "send_webhook",
  "queue_for_review"
]);

export const workflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  trigger: triggerSchema,
  filters: z.record(z.any()).default({}),
  actions: z.array(z.object({ type: actionSchema, config: z.record(z.any()).default({}) })),
  targetResources: z.record(z.any()).default({}),
  outputDefinition: z.record(z.any()).default({}),
  approvalRequired: z.boolean().default(true),
  enabled: z.boolean().default(false),
  auditMetadata: z.record(z.any()).default({})
});

export type WorkflowDefinition = z.infer<typeof workflowSchema>;

export function parseFeatureRequestToWorkflow(input: string): Partial<WorkflowDefinition> {
  const lowered = input.toLowerCase();
  const name = input.slice(0, 64);
  let trigger: WorkflowDefinition["trigger"] = "manual_run";
  if (lowered.includes("when i write")) trigger = "command_detected";
  if (lowered.includes("uploaded") || lowered.includes("website")) trigger = "nextcloud_file_created";

  const actions: WorkflowDefinition["actions"] = [];
  if (lowered.includes("summarize")) actions.push({ type: "summarize_note", config: {} });
  if (lowered.includes("list")) {
    const listName = lowered.match(/list\s+([a-z0-9\-_ ]+)/)?.[1]?.trim() ?? "inbox";
    actions.push({ type: "append_to_list", config: { listName } });
  }
  if (lowered.includes("weekly")) actions.push({ type: "send_webhook", config: { cadence: "weekly" } });

  return {
    name,
    description: input,
    trigger,
    actions,
    approvalRequired: true,
    enabled: false,
    filters: {},
    targetResources: {},
    outputDefinition: {}
  };
}
