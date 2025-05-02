import { Locator, Page } from "playwright";
import { CommonMethods } from "../tests/commonMethods";
import * as XLSX from "xlsx";
import path from "path";
import { expect } from "playwright/test";

export default class SubstorePage {
  readonly page: Page;
  private subStoreLink: Locator;
  private settingsLink: Locator;
  private wardSupply: Locator;
  private accounts: Locator;
  private pharmacy: Locator;
  private inventory: Locator;
  private inventoryRequisition: Locator;
  private consumption: Locator;
  private reports: Locator;
  private patientConsumption: Locator;
  private return: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subStoreLink = page.locator('a[href="#/WardSupply"]');
    this.settingsLink = page.locator('[href="#/Settings"]');
    this.wardSupply = page.locator('a[href="#/WardSupply"]');
    this.accounts = page.locator('i:text("Accounts")');
    this.pharmacy = page.locator('//a[contains(text(), " Pharmacy ")]');
    this.inventory = page.locator('//a[contains(text(), " Inventory ")]');
    (this.inventoryRequisition = page.locator("")),
      (this.consumption = page.locator("")),
      (this.reports = page.locator("")),
      (this.patientConsumption = page.locator("")),
      (this.return = page.locator(""));
  }

  // Getter methods to access private properties
  public getPharmacy() {
    return this.pharmacy;
  }

  public getInventory() {
    return this.inventory;
  }

  public getAccounts() {
    return this.accounts;
  }

  /**
   * This method verifies the visibility and interaction with the sub-modules in the Ward Supply section.
   * It starts by waiting for a brief timeout (2 seconds) to ensure that the page elements are fully loaded.
   * Then, it clicks on the 'Ward Supply' module to display its sub-modules.
   * Once the sub-modules are visible, it waits for the 'Accounts' sub-module to appear on the page, ensuring it
   *  is ready for interaction. Finally, it clicks on the 'Accounts' sub-module to verify that it can be selected
   * and interacted with, ensuring the functionality of the Ward Supply section.
   */
  async verifySubModulesDisplay() {
    await this.page.waitForTimeout(2000);
    this.wardSupply.click();
    await this.accounts.waitFor({ state: "visible" });
    this.accounts.click();
  }

  async navigation() {
    try {
      await CommonMethods.highlightElement(this.settingsLink);
      await this.settingsLink.click();
    } catch (e) {
      console.error("Error", e);
    }
  }
}
