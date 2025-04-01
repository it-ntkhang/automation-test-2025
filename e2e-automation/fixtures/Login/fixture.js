import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/Login/loginPage";
import config from "../../env/index.js";

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(config.BASE_URL+ "customers");
        await loginPage.enterUsername(config.CREDENTIALS.owner.username);
        await loginPage.enterPassword(config.CREDENTIALS.owner.password);
        await loginPage.clickLoginButton();
        await use(loginPage);
    }
});

export { expect } from "@playwright/test";