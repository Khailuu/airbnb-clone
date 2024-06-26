import { test, expect } from "@playwright/test";

test.describe("Login Template Tests", () => {
  test("should login successfully with correct credentials", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', "khailuu151297@gmail.com");
    await page.fill('input[name="password"]', "Luuduckhai1512");
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    await expect(page).toHaveURL("http://localhost:3000");
    await expect(page.locator("text=Login Success!")).toBeVisible();
  });
  test("should add a new user successfully", async ({ page }) => {
    await page.goto("/admin/quanlynguoidung/themnguoidung");

    await page.waitForSelector('input[name="name"]');
    await page.fill('input[name="name"]', "Test User");

    await page.fill('input[name="email"]', "testuser12312@example.com");
    await page.fill('input[name="phone"]', "1234567890");

    await page.waitForSelector('input[name="birthday"]');
    await page.fill('input[name="birthday"]', "01-01-1990");
    await page.fill('input[name="role"]', "USER");

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("http://localhost:3000/admin/quanlynguoidung");
    await expect(
      page.locator("text=Thêm người dùng mới thành công!")
    ).toBeVisible();
  });
  test("should delete a user successfully", async ({ page }) => {
    await page.goto("/admin/quanlynguoidung");

    await page.waitForSelector("text=Test User");
    await page.click("text=Test User >> .. >> anticon-delete");

    await page.waitForSelector('button:has-text("OK")');
    await page.click('button:has-text("OK")');

    await page.waitForSelector("text=Xoá Thành Công");
    expect(await page.isVisible("text=Xoá Thành Công")).toBeTruthy();
  });
});
