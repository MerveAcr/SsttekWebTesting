import { Locator, Page, expect } from "@playwright/test";

export class AddItemWindow{
    public readonly addToCart: Locator;
    public readonly proceedToCart: Locator;
    public readonly goToCart: Locator;

    constructor(public page: Page){
        this.page = page;
        this.addToCart = this.page.locator(`[data-testid="x-atc-action"]`);
        this.proceedToCart = this.page.locator(`.vas-ctas button`);
        this.goToCart = this.page.locator(`span :text-is("Go to cart")`);
    }

    public async clickAddToCart(): Promise<void>{
        await this.addToCart.click({force: true});
    }
 
    public async clickProceedToCart(): Promise<void>{
        if(!await this.proceedToCart.or(this.goToCart).isHidden({timeout:5000})){
            await this.proceedToCart.or(this.goToCart).click({force: true});
        }
    }

}