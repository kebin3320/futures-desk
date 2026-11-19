import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "The lead records a research brief before advising on a futures question.",
  async test(t) {
    await t.send(
      'Record a research brief. Question: backtest a trend signal on one futures contract. Dataset status: no file yet. Next specialist: cta-trader. Next step: list the columns a daily futures file must have.',
    );
    t.succeeded();
    t.calledTool("record_research_brief");
  },
});
