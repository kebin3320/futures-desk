import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

const specialist = z.enum([
  "data-scientist",
  "quant-researcher",
  "cta-trader",
  "lead",
]);

const Brief = z.object({
  question: z.string().min(1),
  datasetStatus: z.string().min(1),
  nextSpecialist: specialist,
  nextStep: z.string().min(1),
});

type BriefRecord = z.infer<typeof Brief> & { savedAt: string };

export default defineTool({
  description:
    "Save the current futures research brief: the question, whether a dataset exists, which specialist should go next, and the single next step. Call this when the user states or updates any of those fields.",
  effect: "write",
  inputSchema: Brief,
  dryRunResult: (input) => ({ saved: false, brief: input }),
  async execute(input, ctx) {
    const brief: BriefRecord = {
      ...input,
      savedAt: ctx.now().toISOString(),
    };
    const sessionKey = `research-brief:${ctx.session.id}`;
    await ctx.host.kv.put(sessionKey, brief);
    await ctx.host.kv.put("research-brief:current", brief);
    return { saved: true, sessionKey, brief };
  },
});
