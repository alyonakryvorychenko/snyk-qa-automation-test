import { Page, expect, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly loginLink: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly titlelocator: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator('#link-login');
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button:has-text("Login")');
        this.titlelocator = page.locator('h1');
    }

    async openPage() {
        await this.page.goto('/');
        await this.loginLink.click();
        await expect(this.titlelocator).toHaveText('Login!');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}