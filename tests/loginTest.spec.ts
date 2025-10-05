import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';

const validUsername = process.env.TEST_USER_NAME || '';
const validPassword = process.env.TEST_USER_PASSWORD || '';
const invalidUsername = 'wrongUser';
const invalidPassword = 'wrongPass';

test.describe('Login Page Tests', () => {
    let loginPages: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPages = new LoginPage(page);
        await loginPages.openPage();
    });

    test('Login with valid credentials and redirect to Admin Panel', async () => {
        await loginPages.login(validUsername, validPassword);
        //TODO: REQUIREMENT SAYS IT MUST REDIRECT TO USR LIST, BUT CURRENTLY IT"S ON ADMIN PAGE
        await expect(loginPages.titlelocator).toHaveText('List Users');
    });

    test('Login with not registered username', async () => {
        await loginPages.login(invalidUsername, validPassword);
        const errorMessageUserName = await loginPages.getErrorMessage();
        expect(errorMessageUserName).toContain(`User "${invalidUsername}" does not exist`);
    });

    test('Login with not valid password', async () => {
        await loginPages.login(validUsername, invalidPassword);
        const errorMessagePassword = await loginPages.getErrorMessage();
        expect(errorMessagePassword).toContain(`Wrong Password`);
    });

    test('Login with empty username and password', async () => {
        await loginPages.login("", "");
        await loginPages.checkBrowserNativeValidation(loginPages.usernameInput);
        await loginPages.login(validUsername, "");
        await loginPages.checkBrowserNativeValidation(loginPages.passwordInput);
    });
});

