import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("artifacts/browser", { recursive: true });
const browser = await chromium.launch();
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const results = [];
for (const width of [1440, 390, 360, 768, 1024, 1920]) {
  const page = await browser.newPage({
    viewport: { width, height: width === 390 ? 844 : 900 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const [name, path] of [
    ["home", "/"],
    ["events", "/events"],
    ["gallery", "/gallery"],
  ]) {
    await page.goto(`${baseURL}${path}`, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 70));
      }
      window.scrollTo(0, 0);
    });
    await page.locator("main img").evaluateAll(async (images) => {
      await Promise.all(
        images
          .filter((image) => image.getBoundingClientRect().width > 0)
          .map((image) => image.decode().catch(() => {})),
      );
    });
    await page.screenshot({
      path: `artifacts/browser/${name}-${width}.png`,
      fullPage: true,
    });
    results.push({
      name,
      width,
      ...(await page.evaluate(() => ({
        height: document.documentElement.scrollHeight,
        overflow: document.documentElement.scrollWidth > innerWidth,
        sections: [
          ...document.querySelectorAll(
            "main > section, main > div > section, main > div.video-section",
          ),
        ].map((section) => ({
          text: section.textContent.trim().slice(0, 60),
          y: section.getBoundingClientRect().top + scrollY,
          height: section.getBoundingClientRect().height,
        })),
        broken: [...document.querySelectorAll("img")]
          .filter(
            (image) =>
              image.getBoundingClientRect().width > 0 &&
              (!image.complete || image.naturalWidth === 0),
          )
          .map((image) => image.getAttribute("src")),
      }))),
      errors: [...errors],
    });
  }
  await page.close();
}
await browser.close();
await writeFile(
  "artifacts/browser/layout-report.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
