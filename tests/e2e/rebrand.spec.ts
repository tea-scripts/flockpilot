import { expect, test } from "@playwright/test";

const MARKETING_PAGES = [
  "/",
  "/about",
  "/features",
  "/pricing",
  "/ai-assistant",
  "/signup/success"
];

const LEGAL_PAGES = ["/privacy-policy", "/terms-and-conditions", "/account/delete"];

test.describe("FlockPilot independent brand", () => {
  for (const path of [...MARKETING_PAGES, ...LEGAL_PAGES]) {
    test(`'${path}' carries no Enro Agro ownership or 'independent product' language`, async ({ page }) => {
      // Catch real JS exceptions. Resource 404s (analytics, manifest icons) are
      // layout-level and out of scope for this smoke test, so we ignore them.
      const pageErrors: string[] = [];
      page.on("pageerror", (err) => pageErrors.push(err.message));

      await page.goto(path);

      const body = page.locator("body");
      await expect(body).not.toContainText(/Enro Agro/i);
      await expect(body).not.toContainText(/independent product/i);
      await expect(body).not.toContainText(/independent platform/i);

      expect(pageErrors, pageErrors.join("\n")).toHaveLength(0);
    });
  }
});

test.describe("Vertical-agnostic positioning & motion", () => {
  test("landing hero signals 'every farm' with rotating farm motifs", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /every profitable farm/i })).toBeVisible();
    await expect(page.getByText("One platform, every farm")).toBeVisible();

    // Marquee renders the farm verticals (duplicated for the loop — match the first).
    await expect(page.getByText("Cattle", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Aquaculture", { exact: true }).first()).toBeVisible();
  });

  test("animated stat labels render in the social-proof bar", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Birds tracked")).toBeVisible();
    await expect(page.getByText("Uptime")).toBeVisible();
  });
});

test.describe("Reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("content is fully visible when reduced motion is preferred", async ({ page }) => {
    await page.goto("/");

    // Reveal/Stagger collapse to static, so primary content must be present immediately.
    await expect(page.getByRole("heading", { name: /every profitable farm/i })).toBeVisible();
    await expect(page.getByText("Birds tracked")).toBeVisible();
    await expect(page.getByText("One platform, every farm")).toBeVisible();
  });
});
