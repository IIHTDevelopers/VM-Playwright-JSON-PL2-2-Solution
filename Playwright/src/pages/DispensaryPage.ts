import { Page, expect, Locator } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";

export default class DispensaryPage {
  readonly page: Page;
  private maxRetries = 3;
  private timeoutDuration = 5000;
  public dispensary: {
    dispensaryLink: Locator;
    activateCounter: Locator;
    counterSelection: Locator;
    counterName: Locator;
    activatedCounterInfo: Locator;
    deactivateCounterButton: Locator;
    titleName: Locator;
    name: Locator;
    prescription: Locator;
    reports: Locator;
    fromDate: Locator;
    showReportButton: Locator;
    userCollectionReport: Locator;
    counterDropdown: Locator;
    counterNameFromTable: Locator;
    rightPointerIcon: string;
    tooltipText: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.dispensary = {
      dispensaryLink: page.locator('a[href="#/Dispensary"]'),
      activateCounter: page.locator("//a[contains(text(),'Counter')]"),
      counterSelection: page.locator('//div[@class="counter-item"]'),
      counterName: page.locator('//div[@class="counter-item"]//h5'),
      activatedCounterInfo: page.locator(`div.mt-comment-info`),
      deactivateCounterButton: page.locator(
        `//button[contains(text(),'Deactivate Counter')]`
      ),
      titleName: page.locator('//span[@class="caption-subject"]'),
      name: page.locator('(//div[@class="col-sm-4 col-md-3"]//label//span)[1]'),
      prescription: page.locator("//a[contains(text(),' Prescription ')]"),
      reports: page.locator(`//a[contains(text(),'Reports')]`),
      fromDate: page.locator(`(//input[@id="date"])[1]`),
      showReportButton: page.locator(`//span[text()="Show Report"]`),
      userCollectionReport: page.locator(`//i[text()="User Collection"]`),
      counterDropdown: page.locator(`select#ddlCounter`),
      counterNameFromTable: page.locator(`div[col-id="CounterName"]`),
      rightPointerIcon: '[class="right"]>i',
      tooltipText: page.locator('[class="page-content"] h6'),
    };
  }

 /**
 * @Test1 Verify tooltip text when hovering over the dispensary pointer icon.
 *
 * @returns {Promise<string>} - Returns the trimmed tooltip text; throws an error if the tooltip text does not match the expected value.
 *
 * Steps:
 * 1. Click on the Dispensary link to open the dispensary section.
 * 2. Hover over the right-pointing icon to trigger the tooltip.
 * 3. Capture the tooltip text displayed.
 * 4. Verify that the tooltip text matches the expected message:
 *    "You are currently in Main Dispensary dispensary. To change, you can always click here."
 * 5. Return the actual tooltip text.
 */

  async verifyAndReturnDispensaryTooltipText(): Promise<string> {
    await this.dispensary.dispensaryLink.click();
    await this.page.hover(this.dispensary.rightPointerIcon);
    const textLocator = this.dispensary.tooltipText;
    const actualText = await textLocator.textContent();
    const expectedText =
      "You are currently in Main Dispensary dispensary. To change, you can always click here.";
    expect(actualText?.trim()).toBe(expectedText);
    return actualText?.trim() || "";
  }
}
