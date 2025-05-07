import { expect, Locator, Page } from "@playwright/test";
import { CommonMethods } from "src/tests/commonMethods";

export class SettingsPage {

  readonly page: Page;
  private settingsLink: Locator;
  private more: Locator;
  private priceCategory: Locator;
  public disable: Locator;
  public activate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsLink = page.locator('a[href="#/Settings"]');
    this.more = page.locator('//a[contains(text(),"More")]');
    this.disable = page.locator('(//a[contains(text(),"Disable")])[1]');
    this.activate = page.locator('(//a[contains(text(),"Activate")])[1]');
    this.priceCategory = page.locator(
      '(//a[@href="#/Settings/PriceCategory"])[2]'
    );
  }

  /**
   * @Test12 This method automates the process of enable/disable price category in more section of the Settings module.
   *
   * @description This function performs the following actions:
   * 1. Navigate to “Settings” module.
   * 2. Click on more... and select "Price Category" tab.
   * 3. Click on “Disable” button to disable any Code in the table.
   * 4. Verify a success message appears with the message "Deactivated.".
   * 5. Activate the same code by clicking “Activate” button and verify the success message as
   */

  async verifyDisablePriceCategory() {
    await CommonMethods.highlightElement(this.settingsLink);
    await this.settingsLink.click();
    await CommonMethods.highlightElement(this.more);
    await this.more.click();
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(2000);
    await CommonMethods.highlightElement(this.priceCategory);
    await this.priceCategory.click();
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(2000);
    await CommonMethods.highlightElement(this.disable);
    await this.disable.click();
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(2000);
  }

  /**
 * @Test12 Verify enabling the Price Category option.
 *
 * @returns {Promise<void>} - Returns void; waits for page load after interaction.
 *
 * Steps:
 * 1. Highlight the "Activate" button for visual confirmation.
 * 2. Click on the "Activate" button to enable the Price Category.
 * 3. Wait for the page to complete loading.
 * 4. Pause execution for 2 seconds to ensure the action is fully processed.
 */


  async verifyEnablePriceCategory() {
    await CommonMethods.highlightElement(this.activate);
    await this.activate.click();
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(2000);
  }
}
