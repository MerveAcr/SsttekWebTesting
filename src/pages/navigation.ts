import { Locator, Page } from "@playwright/test";

export class Navigation{
    public readonly searchByCategory: Locator;
    public readonly watchlistButon: Locator;
    public readonly allWatchlistItem: Locator;
    public readonly ebayLogo: Locator;

    constructor(public page: Page){
        this.page = page;
        this.searchByCategory = this.page.locator(`#gh-shop button`);
        this.watchlistButon = this.page.locator(`#gh-eb #gh-wl-click`);
        this.allWatchlistItem = this.page.locator(`#gh-wl-click-body .rvi__title`);
        this.ebayLogo = this.page.locator(`#gh-l-h1`);
    }

    public async getNavigationLocatorByCategory(category: string): Promise<Locator> {
        return this.page.locator(`a:text-matches("${category}")`).first();
    }

    public async getNavigationLocatorBySubCategory(subCategory: string): Promise<Locator> {
        return this.page.locator(`a:text-is("${subCategory}")`);
        
    }

    public async getCategoryLocator(category: string): Promise<Locator>{
        return this.page.locator(`#gh-sbc a:text-matches("${category}")`);
    }

    public async getCategoryNavigationLocator(category: string): Promise<Locator>{
        return this.page.locator(`.b-visualnav__title:text-is("${category}")`);
    }

    public async clickSearchByCategory(): Promise<void>{
        await this.searchByCategory.click({force: true});
    }

    public async expandSubCategoryItem(category: string): Promise<void>{
        const locator = (await this.getCategoryNavigationLocator(category));
        await locator.click({force: true, timeout: 10000});
    }

    public async clickNavigationCategory(category: string ): Promise<void>{
        const locator = (await this.getNavigationLocatorByCategory(category));
        await locator.click({force: true, timeout: 10000});
    }

    public async clickNavigationLocatorBySubCategory(subCategory: string): Promise<void>{
        const locator = (await this.getNavigationLocatorBySubCategory(subCategory));
        await locator.click({force: true, timeout: 10000});
    }

    public async clickWatchListButton(): Promise<void>{
        await this.watchlistButon.click({force: true, timeout: 10000});
    }

    public async clickAllWatchListItem(): Promise<void>{
        await this.allWatchlistItem.click({force: true, timeout: 10000});
    }
}