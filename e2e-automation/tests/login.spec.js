import { test, expect } from "../utils/Login/fixture.js";

test("Login Test", async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.enterUsername("khang.nguyenthe@haravan.com");
    await loginPage.enterPassword("Khang123@@");
    await loginPage.clickLoginButton();
    
    expect(await loginPage.page.url()).toBe("https://example.com/home");
});