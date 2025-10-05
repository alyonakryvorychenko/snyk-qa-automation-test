import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import { ListUsersPage } from '../src/pages/listUsers';

test.describe('Test User List page', () => {

    const validUsername = process.env.TEST_USER_NAME || '';
    const validPassword = process.env.TEST_USER_PASSWORD || '';
    const fullNameToSearch = 'Lisa Hernandez';
    const partialNameToSearch = 'Lisa';
    const notExistingNameToSearch = 'NotExistingName';

    let listUsers: ListUsersPage;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.openPage();
        await loginPage.login(validUsername, validPassword);

        listUsers = new ListUsersPage(page);
        await listUsers.openPage();
    });

    test('Open User list and check user data presence', async () => {
        await listUsers.checkUserRowsCount(1);
        await listUsers.verifyTableStructure(['Role', 'Name', 'Email']);
    });

    test('Search with full, existing user name.', async () => {
        await listUsers.searchUserByName(fullNameToSearch);
        await listUsers.checkOnlyOneUserPresent(fullNameToSearch);
    });

    test('Search with partial, existing user name.', async () => {
        await listUsers.searchUserByName(partialNameToSearch);
        await listUsers.checkAllFoundUsersContainName(partialNameToSearch);
    });

    test('Search with not existing user name', async () => {
        await listUsers.searchUserByName(notExistingNameToSearch);
        await listUsers.checkNoUsersPresent();
    });
});
