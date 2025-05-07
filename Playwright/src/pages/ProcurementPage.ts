import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

// import { error } from "console";

export default class ProcurementPage {
  readonly page: Page;
  private procurement: Locator;
  private quotations: Locator;
  private requestForQuotation: Locator;
  private subject: Locator;
  private description: Locator;
  private selectVendor: Locator;
  private dropdownOption: Locator;
  private itemName: Locator;
  private itemValue: Locator;
  private dropdownArrowButton: Locator;
  private quantity: Locator;
  private requestButton: Locator;
  private quotationGeneratedPopup: Locator;
  quotationMessageText: string | null = null;

  constructor(page: Page) {
    this.page = page;
    this.procurement = page.locator('a[href="#/ProcurementMain"]');
    this.quotations = page.locator(`//a[contains(text(),"Quotation")]`);
    this.requestForQuotation = page.locator(
      `//input[@value=" Request For Quotation"]`
    );
    this.subject = page.locator(`//input[@id="Subject"]`);
    this.description = page.locator(`//textarea[@id="Description"]`);
    this.selectVendor = page.locator(
      `div.c-btn span:has-text("---Select Vendor---")`
    );
    this.dropdownOption = page.locator(`label:has-text("Ashar & Company")`);
    this.itemName = page.locator(`input[formcontrolname="ItemId"]`);
    this.itemValue = page.locator(
      `(//li[@class="item" and contains(text(),'Soap')])[1]`
    );
    this.dropdownArrowButton = page.locator(`span.fa.fa-angle-up`);
    this.quantity = page.locator(`input[formcontrolname="Quantity"]`);
    this.requestButton = page.locator(`#RequestButton`);
    this.quotationGeneratedPopup = page.locator(
      `text=Request For Quotation is Generated and Saved`
    );
  }

  /**
   * @Test8 Verify Request for Quotation Generation
   *
   *
   * This method verifies the process of generating a Request For Quotation (RFQ) in the Procurement section.
   * It starts by navigating to the Procurement section and selecting the Quotation option, followed by clicking
   * on "Request For Quotation". The method then fills in the subject and description fields, selects a vendor from
   * the dropdown, and ensures the dropdown is visible and clicked. Next, it waits for the item name and quantity fields
   * to be visible, then fills in the item details (name and quantity). After that, it clicks the "Request" button to submit
   * the quotation request. The method waits for the "Request For Quotation is Generated and Saved" popup to appear and
   * retrieves its text content. The text content of the popup is then stored in the `quotationMessageText` class property
   * for further validation or assertion. The method includes necessary waits to ensure that elements are visible and ready
   * before interaction, helping ensure that the process completes smoothly.
   */
  async verifyRequestForQuotationGeneration() {
      await this.page.waitForTimeout(2000);
      await this.procurement.click();
      await this.quotations.click();
      await this.requestForQuotation.click();
      await this.subject.click();
      await this.subject.fill("test subject");
      await this.description.click();
      await this.description.fill("test description");
      await this.selectVendor.click();
      await this.dropdownOption.click();
      await this.dropdownArrowButton.waitFor({ state: "visible" });
      await this.dropdownArrowButton.click();
      await this.page.waitForTimeout(1000);
      await this.itemName.waitFor({ state: "visible" });
      await this.itemName.click();
      await this.itemName.fill("Soap");
      await this.itemValue.click();
      await this.quantity.click();
      await this.quantity.fill("2");
      await this.page.waitForTimeout(1000);
      await this.requestButton.waitFor({ state: "visible" });
      await expect(this.requestButton).toBeEnabled();
      await this.requestButton.click();
      await this.page.waitForTimeout(2000);
      await this.quotationGeneratedPopup.waitFor({ state: "visible" });
      this.quotationMessageText =
      await this.quotationGeneratedPopup.textContent();
  }
}
