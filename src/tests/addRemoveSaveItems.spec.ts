import { test, expect } from '@playwright/test';
import { Navigation } from '../pages/navigation';
import { HomeAndGardenSubMenu, HomeDekorSubMenu, MainNavigationMenu } from '../utils/constant/Navigation';
import { ResultPage } from '../pages/resultPage';
import { AddItemWindow } from '../pages/addItemWindow';
import { ItemDetailsPage } from '../pages/itemDetailsPage';
import { Cart } from '../pages/cart';
import { SignIn } from '../pages/signInPage';
import { Watchlist } from '../pages/watchlist';
import { Pages } from '../utils/constant/Pages';
import { UserInfo } from '../utils/constant/userData';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test.describe.configure({mode:'parallel'});
test.describe('SSTTEK Technical Assessment', () => {
  test('user able to add item to the card and remove items ', async ({ page, context}) => {   
    let navigation = new Navigation(page);
    let resultPage = new ResultPage(page);
    let item1, item2, item3;
    //sometimes we got error page, clicking logo might help(not always)
    await navigation.ebayLogo.click();

    await test.step('select home & garden, and home decor, and sub menu', async () => {
      await navigation.clickNavigationCategory(MainNavigationMenu.HOME_AND_GARDEN);
      await page.waitForTimeout(2000)
      await navigation.expandSubCategoryItem(HomeAndGardenSubMenu.HOME_DECOR);
      await page.waitForTimeout(2000);
      await navigation.clickNavigationLocatorBySubCategory(HomeDekorSubMenu.CLOCKS);
    });

    await test.step('save first 3 item name', async () => {
     //save first 3 item's name for verification
       item1  = await resultPage.getItemTitlesByIndex(1);
       item2 = await resultPage.getItemTitlesByIndex(2);
       item3 = await resultPage.getItemTitlesByIndex(3);
    });

    await test.step('select first item, verify correct item selected, and add to the cart', async () => {
          // handle new page and continue action in the new page
        const [newPage] = await Promise.all([
          context.waitForEvent("page"),
          await resultPage.selectItemOnResultPage(1),
        ]);
        newPage.waitForLoadState();       
        let newNav  = new AddItemWindow(newPage);
        let itemDetailsPage = new ItemDetailsPage(newPage);
        let cartPage = new Cart(newPage);

        await newPage.waitForTimeout(5000);
        await newNav.clickAddToCart();
        expect(await cartPage.itemNameTextLocatorInCart(item1)).toBeVisible({timeout:10000});
     });

        await test.step('select second item, verify correct item selected, and add to the cart', async () => {
        // handle new page and continue action in the new page
        const [newPage1] = await Promise.all([
          context.waitForEvent("page"),
          await resultPage.selectItemOnResultPage(2),
        ]);
        newPage1.waitForLoadState();       
        let newNav1  = new AddItemWindow(newPage1);
        let itemDetailsPage1 = new ItemDetailsPage(newPage1);
        let cartPage = new Cart(newPage1);

        await newPage1.waitForTimeout(5000);
        await newNav1.clickAddToCart();
        expect(await cartPage.itemNameTextLocatorInCart(item2)).toBeVisible({timeout:10000});
      });

      await test.step('select second item, verify correct item selected, and add to the cart', async () => {
        // handle new page and continue action in the new page
        const [newPage2] = await Promise.all([
          context.waitForEvent("page"),
          await resultPage.selectItemOnResultPage(3),
        ]);
        newPage2.waitForLoadState();       
        let newNav2  = new AddItemWindow(newPage2);
        let itemDetailsPage2 = new ItemDetailsPage(newPage2);
        let cart = new Cart(newPage2);

        await newPage2.waitForTimeout(5000);
        await newNav2.clickAddToCart();

        expect(await cart.itemNameTextLocatorInCart(item3)).toBeVisible({timeout:10000});

        await test.step('remove item by name and verify item is removed from cart', async () => {
          await cart.removeByItemName(item1);
          await newPage2.waitForTimeout(5000);
          // verify that item removed from the cart by checking the confirmation message
          expect(await cart.removedItemName).toHaveText(item1 + '  was removed from your cart.',{timeout:10000});
          await newPage2.waitForTimeout(5000);
          // verify that item removed from cart list
          expect(await cart.itemNameTextLocatorInCart(item1)).toBeHidden({timeout:10000});
        });
      });   
 });
});

test.describe('SSTTEK Technical Assessment', () => {
  test('user able to add item to watchlist ', async ({ page, context }) => {
    let signIn = new SignIn(page);
    let navigation = new Navigation(page);
    let resultPage = new ResultPage(page);
    let item1, item2, item3;
    
    await test.step('navigate to sign in page', async () => {
      await page.goto(Pages.SIGNIN);
    });

    await test.step('enter username and password and sign in', async () => {
      await signIn.enterUsername(UserInfo.USERNAME);
      await signIn.clickContinueButton();
      await page.waitForTimeout(3000);
      await signIn.enterPassword(UserInfo.PASSWORD);
      await signIn.clickSignInButton();
    });

    await test.step('select home & garden, and home decor, and sub menu', async () => {
      await navigation.clickNavigationCategory(MainNavigationMenu.HOME_AND_GARDEN);
      await page.waitForTimeout(2000)
      await navigation.expandSubCategoryItem(HomeAndGardenSubMenu.HOME_DECOR);
      await page.waitForTimeout(2000);
      await navigation.clickNavigationLocatorBySubCategory(HomeDekorSubMenu.CLOCKS);
    });

    await test.step('save first 3 item name', async () => {
     //save first 3 item's name for verification
       item1  = await resultPage.getItemTitlesByIndex(4);
       item2 = await resultPage.getItemTitlesByIndex(5);
       item3 = await resultPage.getItemTitlesByIndex(6);
    });

    await test.step('select first item, switch to new window and verify item is saved', async () => {
        //switch to new window and watch first item
      const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        await resultPage.selectItemOnResultPage(4),
      ]);
      newPage.waitForLoadState();       
      let itemDetailsPage = new ItemDetailsPage(newPage);
      await itemDetailsPage.clickAddToWatchList();

      //verify add to watch button become watching button
      expect(itemDetailsPage.watchingStatus).toBeVisible()
     });

     await test.step('select second item, switch to new window and verify item is saved', async () => {
      //switch to new window and watch second item
      const [newPage1] = await Promise.all([
      context.waitForEvent("page"),
      await resultPage.selectItemOnResultPage(5),
      ]);
      newPage1.waitForLoadState();       
      let itemDetailsPage1 = new ItemDetailsPage(newPage1);
      await itemDetailsPage1.clickAddToWatchList();

      //verify add to watch button become watching button
      expect(itemDetailsPage1.watchingStatus).toBeVisible({timeout:10000})
      });

      //switch to new window and watch third item
      const [newPage2] = await Promise.all([
        context.waitForEvent("page"),
        await resultPage.selectItemOnResultPage(6),
      ]);
      newPage2.waitForLoadState();       
      let itemDetailsPage2 = new ItemDetailsPage(newPage2);
      let navigation2 = new Navigation(newPage2);
      let watchlist = new Watchlist(newPage2);
      await itemDetailsPage2.clickAddToWatchList();
      
      await newPage2.goto(Pages.WATCHLIST);
      await expect(watchlist.delete).toBeVisible({timeout:5000});
      const allSavedItems = await watchlist.getAllSavedItems();
      //verify watchlist page contains selected items
      expect(allSavedItems).toContain(item1 && item2 && item3);
  });

    test.afterEach(async ({ page }) => {
      await page.goto(Pages.WATCHLIST);
      let watchlist = new Watchlist(page); 
      watchlist.clickBulkCheck();
      watchlist.clickDelete();
  });
});
