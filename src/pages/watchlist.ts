import { Locator, Page } from "@playwright/test";

export class Watchlist{
    public readonly allItems: Locator;
    public readonly bulkCheck: Locator;
    public readonly delete: Locator;

    constructor(public page: Page){
        this.page = page;
        this.allItems = this.page.locator(`.m-items .m-item .item-title`);
        this.bulkCheck = this.page.locator(`.bulkCheck`);
        this.delete = this.page.locator(`.m-items-header button:text-is("Delete")`);
    }

    public async getAllSavedItems(): Promise<string[]> {
        return this.allItems.allTextContents();
     }

    public async clickBulkCheck(): Promise<void> {
        await this.bulkCheck.click();
    }

    public async clickDelete(): Promise<void> {
         await this.delete.click();
    }

}