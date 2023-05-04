import { Locator, Page } from "@playwright/test";

export class SignIn{
    public readonly username: Locator;
    public readonly password: Locator;
    public readonly continueButton: Locator;
    public readonly signInButton: Locator;

    constructor(public page: Page){
        this.page = page;
        this.username = this.page.locator(`#userid`);
        this.password = this.page.locator(`#pass`);
        this.continueButton = this.page.locator(`#signin-continue-btn`);
        this.signInButton = this.page.locator(`#sgnBt`);
    }

    public async enterUsername(username: string): Promise<void> {
        await this.username.type(username);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.username.type(password);
    }

    public async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    public async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }

}