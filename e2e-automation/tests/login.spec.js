import { test, expect } from "../fixtures/Login/fixture.js";
import config from "../env/index.js";

test("Login Test", async ({ loginPage }) => {
    await loginPage.page.waitForLoadState();
    expect(await loginPage.page.url()).toBe(config.BASE_URL+ "customers");
});