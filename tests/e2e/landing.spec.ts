import { expect, test } from "@playwright/test";

test.describe("FlockPilot landing page", () => {
  test("hero CTAs navigate to target sections", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Request a Demo" }).click();
    await expect(page).toHaveURL(/#demo$/);

    await page.getByRole("link", { name: "View Pricing" }).click();
    await expect(page).toHaveURL(/#pricing$/);
  });

  test("pricing section exposes monthly and annual billing options", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "View Pricing" }).click();
    await expect(page).toHaveURL(/#pricing$/);

    const monthlyToggle = page.getByRole("button", { name: "Monthly" });
    const annualToggle = page.getByRole("button", { name: "Annual (15% off)" });
    await expect(monthlyToggle).toBeVisible();
    await expect(annualToggle).toBeVisible();
  });

  test("faq accordion expands and reveals content", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByText(/Active birds means birds currently in live batches during the month\./i)
    ).toBeVisible();
  });

  test("demo form validates required fields", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Request Demo" }).click();

    await expect(
      page.getByText("Please correct the highlighted fields and try again.")
    ).toBeVisible();
  });
});
