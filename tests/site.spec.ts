import { expect, test } from "@playwright/test";

const filenames = [
  "IMG_3090.jpg",
  "IMG_3479.jpg",
  "IMG_2828.jpg",
  "IMG_3370.jpg",
  "IMG_3582.jpg",
  "IMG_3364.jpg",
  "IMG_3018.jpg",
  "IMG_3527.jpg",
  "IMG_2607.jpg",
  "IMG_3468.jpg",
  "IMG_3398.jpg",
  "SJ8A2880.jpg",
];
const signup = "https://www.journeytoexcellenceangloeast.ca/accounts/signup/";
const login = "https://www.journeytoexcellenceangloeast.ca/accounts/login/";

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  for (const route of ["/", "/events", "/gallery"]) {
    test(`${route} loads without overflow or browser errors at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(errors).toEqual([]);
      await expect(page).toHaveTitle(/Journey to Excellence/);
    });
  }
}

test("navigation and account destinations", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Upcoming Events" })
    .click();
  await expect(page).toHaveURL(/\/events$/);
  await expect(
    page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Upcoming Events" }),
  ).toHaveAttribute("aria-current", "page");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Gallery" })
    .click();
  await expect(page).toHaveURL(/\/gallery$/);
  await expect(
    page.getByRole("link", { name: "Explore upcoming events" }),
  ).toHaveAttribute("href", "/events");
  await expect(
    page.getByRole("link", { name: "Register to attend" }),
  ).toHaveAttribute("href", signup);
  await page
    .getByRole("navigation", { name: "Breadcrumb" })
    .getByRole("link", { name: "Home" })
    .click();
  await expect(page).toHaveURL("/");
  await expect(
    page.getByRole("link", { name: "Register now" }),
  ).toHaveAttribute("href", signup);
});

test("mobile menu supports Escape, keyboard focus and navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(menu).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await expect(
    menu.getByRole("link", { name: "Sign in", exact: true }),
  ).toHaveAttribute("href", login);
  await page.screenshot({ path: "artifacts/browser/menu-390.png" });
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await menu.getByRole("link", { name: "Upcoming Events" }).click();
  await expect(page).toHaveURL(/\/events$/);
  await expect(menu).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("event filters show the correct programme categories and retain portal links", async ({
  page,
}) => {
  await page.goto("/events");
  await expect(page.locator("[data-event-id]")).toHaveCount(4);
  for (const [category, count] of [
    ["Learning", 2],
    ["Leadership", 1],
    ["Community", 1],
    ["All events", 4],
  ] as const) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await expect(page.locator("[data-event-id]")).toHaveCount(count);
    await expect(
      page.getByRole("button", { name: category, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  }
  for (const link of await page.locator("#event-results a").all())
    await expect(link).toHaveAttribute("href", login);
  await page.getByRole("link", { name: "Browse events" }).click();
  await expect(page).toHaveURL(/#event-directory$/);
});

for (const width of [1440, 390]) {
  test(`every photo, wrapping navigation, keyboard controls and focus restoration at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto("/gallery");
    const viewer = page.getByRole("dialog", { name: "Photo gallery viewer" });
    const thumbs = page.locator("[data-photo-id]");
    expect(
      await thumbs.evaluateAll((buttons) =>
        buttons.map((button) => Number(button.getAttribute("data-photo-id"))),
      ),
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    for (let index = 0; index < filenames.length; index++) {
      await thumbs.nth(index).click();
      await expect(viewer).toBeVisible();
      await expect(viewer.locator(".viewer-image img")).toHaveAttribute(
        "src",
        new RegExp(encodeURIComponent(filenames[index])),
      );
      await expect(viewer.locator(".viewer-counter")).toHaveText(
        `${String(index + 1).padStart(2, "0")} / 12`,
      );
      await expect(
        viewer.getByRole("link", { name: "Open original" }),
      ).toHaveAttribute(
        "href",
        /^https:\/\/drive.google.com\/file\/d\/.+\/view/,
      );
      await page.keyboard.press("Escape");
      await expect(viewer).not.toBeVisible();
      await expect(thumbs.nth(index)).toBeFocused();
    }
    await thumbs.first().click();
    await page.keyboard.press("ArrowLeft");
    await expect(viewer.locator(".viewer-counter")).toHaveText("12 / 12");
    await page.keyboard.press("ArrowRight");
    await expect(viewer.locator(".viewer-counter")).toHaveText("01 / 12");
    await viewer.getByRole("button", { name: "Next photo" }).click();
    await expect(viewer.locator("#viewer-caption")).toHaveText(
      "Sharing a screen, sharing ideas",
    );
    expect(await page.evaluate(() => document.body.style.overflow)).toBe(
      "hidden",
    );
    for (let i = 0; i < 9; i++) {
      await page.keyboard.press("Tab");
      expect(
        await viewer.evaluate((dialog) =>
          dialog.contains(document.activeElement),
        ),
      ).toBe(true);
    }
    await viewer
      .locator(".viewer-image img")
      .evaluate(async (image: HTMLImageElement) => image.decode());
    await expect(viewer.locator(".viewer-image img")).toHaveCSS(
      "object-fit",
      "contain",
    );
    await page.screenshot({ path: `artifacts/browser/viewer-${width}.png` });
    await viewer.getByRole("button", { name: "Close photo viewer" }).click();
    await expect(thumbs.first()).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
      "hidden",
    );
    await page
      .getByRole("button", {
        name: "Enlarge featured photo: Gathering in the atrium",
      })
      .click();
    await expect(viewer.locator(".viewer-counter")).toHaveText("01 / 12");
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("link", { name: "View the full collection" }),
    ).toHaveAttribute(
      "href",
      /drive.google.com\/drive\/folders\/1hB0ha1xclHgimTkREymkrRzOCJe_z5eE/,
    );
  });
}

test("FAQs expose answers and collapse correctly", async ({ page }) => {
  await page.goto("/");
  const first = page.getByRole("button", {
    name: "Who is Journey to Excellence for?",
  });
  await expect(first).toHaveAttribute("aria-expanded", "true");
  const registration = page.getByRole("button", { name: "How do I register?" });
  await registration.click();
  await expect(registration).toHaveAttribute("aria-expanded", "true");
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#faq-answer-1")).toBeVisible();
  await registration.click();
  await expect(page.locator("#faq-answer-1")).not.toBeVisible();
});

test("video player is deferred until Play and uses the supplied video", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#film iframe")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Watch the Video", exact: true })
    .click();
  const player = page.getByTitle(
    "Summer Learning Week 2026 — Journey to Excellence",
  );
  await expect(player).toHaveAttribute(
    "src",
    "https://www.youtube-nocookie.com/embed/XAmUoXyUh3E?autoplay=1&rel=0",
  );
  await expect(player).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Watch on YouTube" }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=XAmUoXyUh3E");
});
