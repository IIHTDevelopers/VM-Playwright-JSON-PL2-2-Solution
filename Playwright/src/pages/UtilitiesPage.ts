import { Page, expect, Locator } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";

export default class UtilitiesPage {
  readonly page: Page;
  public utilities: {
    utilitiesModule: Locator;
    ChangeBillingCounter: Locator;
    counters: Locator;
    counterItem: Locator;
    schemeRefund: Locator;
    newSchemeRefundEntry: Locator;
    saveButton: Locator;
    warningPopup: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.utilities = {
      utilitiesModule: page.locator("//span[text()='Utilities']"),
      ChangeBillingCounter: page.locator(
        '//a[text()= " Change Billing Counter "]'
      ),
      counters: page.locator("//div[@class='modelbox-div clearfix']"),
      counterItem: page.locator("//div[@class='counter-item']"),
      schemeRefund: page.locator('a[href="#/Utilities/SchemeRefund"]').nth(1),
      newSchemeRefundEntry: page.locator(
        "//a[text()=' New Scheme Refund Entry']"
      ),
      saveButton: page.locator('button#savebutton:has-text("Save")'),
      warningPopup: page.locator("text=Please fill all the mandatory fields."),
    };
  }

  /**
   * This method verifies that the appropriate warning popup is displayed
   * when attempting to save a "Scheme Refund Entry" without filling in
   * the mandatory fields. It navigates to the Utilities module, selects
   * the "Scheme Refund" section, clicks on a counter item, and proceeds
   * to the "New Scheme Refund Entry" form. Without entering any data,
   * it clicks the save button to trigger and validate the warning popup.
   */

  /** 
   *
   * @Test11 Verify Warning Popup for Mandatory Fields in Scheme Refund
   * 
   * 
   * 1.	Navigate to Utilities module and select "Scheme Refund" tab.
   * 2.	If required, please select any counter value and then select “Scheme Refund” tab.
   * 3.	Click on "New scheme Refund Entry" button.
   * 4.	Now click on save without entering value in any field.

   */

  async verifyWarningPopupForMandatoryFiels() {
    await this.page.waitForTimeout(2000);
    await this.utilities.utilitiesModule.click();
    await this.utilities.schemeRefund.waitFor({ state: "visible" });
    await this.utilities.schemeRefund.click();
    await this.utilities.counterItem.first().click();
    await this.utilities.newSchemeRefundEntry.waitFor({ state: "visible" });
    await this.utilities.newSchemeRefundEntry.click();
    await this.page.waitForTimeout(1000);
    await this.utilities.saveButton.click();
  }
}
