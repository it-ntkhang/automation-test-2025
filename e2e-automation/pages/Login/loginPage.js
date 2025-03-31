class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = "#Username";
        this.passwordInput = "#Password";
        this.loginButton = "#btn-submit-login";
    }

    async goToLoginPage() {
        await this.page.goto("https://larabot.myharavan.com/admin");
    }

    async enterUsername(username) {
        await this.page.fill(this.usernameInput, username);
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLoginButton() {
        await this.page.click(this.loginButton);
    }
}

export { LoginPage };