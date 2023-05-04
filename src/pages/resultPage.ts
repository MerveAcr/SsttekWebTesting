import { Locator, Page } from "@playwright/test";

export class ResultPage{
    public readonly searchResultItems: Locator;
    public readonly itemTitles: Locator;

    constructor(public page: Page){
        this.page = page;
        this.searchResultItems = this.page.locator(`.b-list__items_nofooter li .s-item__image`);
        this.itemTitles = this.page.locator(`.b-list__items_nofooter li .s-item__title`);
    }

    public async selectItemOnResultPage(index: number): Promise<void> {
        await this.searchResultItems.nth(index).click({force: true});
    }

    public async getItemTitlesByIndex(index: number): Promise<string | null> {
        return this.itemTitles.nth(index).textContent();
     }

}