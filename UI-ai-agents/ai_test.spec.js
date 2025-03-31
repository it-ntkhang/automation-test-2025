import { test, expect } from '@playwright/test';

let page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://accounts.hara.vn/admin');
    await page.fill('#username', 'user123');
    await page.fill('#password', 'pass123');
    await page.click('#login-btn');
    await page.waitForSelector('#welcome-msg');
});

test('Đăng nhập thành công - Thông tin đăng nhập chính xác', async () => {
    await page.goto('URL/LoginPage');
    await page.fill('username', 'user_name');
    await page.fill('password', 'password');
    await page.click('loginButton');
    await expect(page.locator("selector")).toHaveText("success_message");
});

