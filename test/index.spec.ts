import { runExample } from "../src";

describe("Testing specific functionality", () => {
  it("should test for a specific thing", async () => {
    await runExample();
  }).timeout(120_000);
});
