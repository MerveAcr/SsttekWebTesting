import { Locator, Page } from "@playwright/test";

export class Cart{
    public readonly removedItemName: Locator;

    constructor(public page: Page){
        this.page = page;
        this.removedItemName = this.page.locator(`[aria-labelledby="confirmation-status"] [class="text-display-span"]`);
    }

    public async itemNameTextLocatorInCart(name: string) : Promise<Locator> {
        return this.page.locator(`[data-test-id="list-summary"] :text-matches("${name}")`)
     }

    public async removeByItemName(name: string): Promise<void> {
        const ele = this.page.locator(`//button[contains(@aria-label, "Remove - ${name}")]`)
        ele.click();
    }

}