import { Locator, Page, expect } from '@playwright/test';


export class ListUsersPage { 
    readonly page: Page;

    readonly listUsersLink: Locator; 
    readonly titleLocator: Locator;
    readonly tableRowLocator: Locator;
    readonly tableHeaderLocator: Locator;
    readonly userNameCellLocator: Locator;
    readonly searchResultsMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.listUsersLink = page.locator('li:has-text("List Users")');
        this.titleLocator = page.locator('h1');
        this.tableRowLocator = page.locator('tbody tr');
        this.tableHeaderLocator = page.locator('thead tr th');
        this.userNameCellLocator = page.locator('tbody td.sorting_1');
        this.searchResultsMessage = page.locator('p:has-text("Search results for:")');
    }

    async openPage() {
        await this.listUsersLink.click();
        // await this.page.locator(this.listUsersLink).click();
        await expect(this.titleLocator).toHaveText('List Users');
    }

    async checkUserRowsCount(expectedCount: number) {
        const rowsNumber = await this.tableRowLocator.count();
        expect(rowsNumber).toBeGreaterThanOrEqual(expectedCount);
    }

    async getUserNames(): Promise<string[]> {
        return await this.userNameCellLocator.allTextContents();
    }

    async verifyTableStructure(dataPresence: string[]) {
        const tableHeaders = await this.tableHeaderLocator.allTextContents();
        const trimmedHeaders = tableHeaders.map(header => header.trim());
        expect(trimmedHeaders).toEqual(expect.arrayContaining(dataPresence));
    }

    // TODO: create a separate function for checking single user data presence. I will show you example

    async searchUserByName(name: string) {
        const search = this.page.getByRole('textbox', { name: 'Search' });
        search.click();
        search.fill(name);
        search.press('Enter');
        await this.searchResultsMessage.waitFor({ state: 'visible' });
    }

    async checkOnlyOneUserPresent(name: string) {
        await this.checkUserRowsCount(1);
        const userNamesReceived = await this.getUserNames();
        expect(userNamesReceived).toEqual([name]);
    }

    async checkAllFoundUsersContainName(expectedName: string) {
        const nameResults = await this.userNameCellLocator.allTextContents();
        for (const name of nameResults) {
            expect(name.toLowerCase()).toContain(expectedName.toLowerCase());
        }
    }

    async checkNoUsersPresent() {
        await this.checkUserRowsCount(0);
    }
}