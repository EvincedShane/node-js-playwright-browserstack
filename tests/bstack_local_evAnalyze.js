const { EvincedSDK } = require("@evinced/js-playwright-sdk");
const { existsSync } = require("node:fs");
const { test, expect } = require("@playwright/test");

test.describe("Evinced evAnalyze LOCAL", () => {
  test("Single test run using evAnalyze", async ({ page }) => {
    const evReport = "./test-results/evAnalyze.html";
    const jsonReport = "./test-results/evAnalyze.json";
    const evincedService = new EvincedSDK(page);
    await page.goto(
      "https://www.argos.co.uk/search/grey/?clickOrigin=searchbar:cat:term:grey"
    );
    const issues = await evincedService.evAnalyze();
    console.log("Issues =", issues);
    await evincedService.evSaveFile(issues, "html", evReport);
    await evincedService.evSaveFile(issues, "json", jsonReport);
    expect(existsSync(evReport)).toBeTruthy();
  });
});
