import { expect, test } from "@playwright/test";

test("create, view, and delete a piece of equipment", async ({ page }) => {
  const name = `Test Excavator ${Date.now()}`;
  const vin = `VIN-${Date.now()}`;

  await page.goto("/equipment");
  await expect(page.getByRole("heading", { name: "Equipment" })).toBeVisible();

  await page.getByRole("link", { name: "Add Equipment" }).click();
  await expect(
    page.getByRole("heading", { name: "Add Equipment" }),
  ).toBeVisible();

  await page.getByRole("textbox", { name: "Name", exact: true }).fill(name);
  await page.getByRole("textbox", { name: "VIN", exact: true }).fill(vin);
  await page.getByRole("button", { name: "Create Equipment" }).click();

  await expect(page.getByRole("heading", { name })).toBeVisible();

  await page.getByRole("link", { name: "Equipment" }).click();
  await expect(page.getByRole("heading", { name })).toBeVisible();

  await page.getByRole("heading", { name }).click();
  await expect(page.getByRole("heading", { name, level: 1 })).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Delete" })
    .click();

  await expect(page.getByRole("heading", { name: "Equipment" })).toBeVisible();
  await expect(page.getByRole("heading", { name })).not.toBeVisible();
});
