import { test, expect } from "../utils/Login/fixture.js";

test("Login Test", async ({ loginPage }) => {
    expect(await loginPage.page.url()).toBe("https://example.com/home");
});