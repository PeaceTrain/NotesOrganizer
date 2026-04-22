import { prisma } from "@inkforge/db/src";
import { WorkflowDefinition } from "@inkforge/workflows/src";

export async function saveWorkflow(def: WorkflowDefinition) {
  return prisma.workflowDefinition.create({
    data: {
      id: def.id,
      name: def.name,
      description: def.description,
      trigger: def.trigger,
      filters: def.filters,
      actions: def.actions,
      targets: def.targetResources,
      output: def.outputDefinition,
      approvalRequired: def.approvalRequired,
      enabled: def.enabled,
      auditMetadata: def.auditMetadata
    }
  });
}
