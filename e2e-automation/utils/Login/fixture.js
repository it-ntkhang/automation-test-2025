import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/Login/loginPage";

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.enterUsername("testuser");
        await loginPage.enterPassword("password");
        await loginPage.clickLoginButton();
        await use(loginPage);
    }
});

export { expect } from "@playwright/test";