import { Locator, Page } from "@playwright/test";

export class ItemDetailsPage{
    public readonly searchResultItems: Locator;
    public readonly itemTitles: Locator;
    public readonly itemDetailPageTitle: Locator;
    public readonly addToWatchList: Locator;
    public readonly watchingStatus: Locator; 

    constructor(public page: Page){
        this.page = page;
        this.searchResultItems = this.page.locator(`.b-list__items_nofooter li`);
        this.itemTitles = this.searchResultItems.locator(`.s-item__title`);
        this.itemDetailPageTitle = this.page.locator(`[data-testid="x-item-title"]`);
        this.addToWatchList = this.page.locator(`[data-testid="x-watch-action"]`);
        this.watchingStatus = this.page.locator(`.watching`);
    }

    public async selectItemOnResultPage(index: number): Promise<void> {
        await this.searchResultItems.nth(index).click({force: true});
    }

    public async getItemTitlesByIndex(index: number): Promise<string | null> {
        return this.itemTitles.nth(index).textContent();
    }

    public async clickAddToWatchList(): Promise<void> {
        await this.addToWatchList.click();
    }

    public async getItemTitle(): Promise<any> {
        await this.itemDetailPageTitle.textContent();
    }

}