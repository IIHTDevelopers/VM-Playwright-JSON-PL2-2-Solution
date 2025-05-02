import { Locator, Page } from "playwright";
import { CommonMethods } from "../tests/commonMethods";
import * as XLSX from "xlsx";
import path from "path";
import { expect } from "playwright/test";

export default class PharmacyPage {
  readonly page: Page;
  private pharmacy: Locator;
  private order: Locator;
  private export: Locator;
  downloadPath: string | undefined;

  constructor(page: Page) {
    this.page = page;
    this.pharmacy = page.locator(
      '//a[@href="#/Pharmacy" and contains(.,"Pharmacy")]'
    );
    this.order = page.locator(
      `//a[contains(@href, "#/Pharmacy/Order") and contains(text(), "Order")]`
    );
    this.export = page.locator(`button[title="Export To Excel"]`);
  }

  /**
   * This method verifies the functionality of exporting the order section data. It first waits for a brief timeout
   * to ensure that the page elements are fully loaded. Then, it navigates through the pharmacy section and selects
   * the order option once it's visible. After that, the method waits for the file download to begin by listening for
   * the 'download' event. Once the export button is clicked, it waits for the download to complete and saves the
   * file to the specified download directory. The file path of the downloaded file is stored in the `downloadPath`
   * variable for further use or validation. This method helps in validating that the export functionality works as
   * expected and the file is successfully downloaded.
   */

  /**
   * @Test10 Verify to export the order section data
   *
   * 1. Navigate to https://healthapp.yaksha.com/Home/Index#/Pharmacy/Dashboard
   * 2. Click on order section
   * 3. Click on "Export" button
   *
   */

  async verifyExportOrderSectionData() {
    await this.page.waitForTimeout(2000);
    await this.pharmacy.click();
    await this.order.waitFor({ state: "visible" });
    await this.order.click();
    // Wait for download to start before clicking
    const downloadPromise = this.page.waitForEvent("download");
    await this.export.click();
    // Wait for download to complete
    const download = await downloadPromise;
    const filePath = path.join(
      __dirname,
      "..",
      "downloads",
      download.suggestedFilename()
    );
    await download.saveAs(filePath);
    this.downloadPath = filePath;
  }
}
