import { Locator, Page } from "playwright";
import { CommonMethods } from "../tests/commonMethods";
import testData from "../Data/testData.json";
import * as XLSX from "xlsx";
import path from "path";
import { expect } from "playwright/test";

export default class NursingPage {
  readonly page: Page;
  private nursing_tab: Locator;
  private past_days: Locator;
  private from_date: Locator;
  private ok_button: Locator;
  private search_field: Locator;
  private overview_button: Locator;
  private upload_button: Locator;
  private dept_dropdown: Locator;
  private upload_file: Locator;
  private submit_button: Locator;
  private checkbox: Locator;
  private conclude: Locator;
  private saveButton: Locator;
  downloadPath: string | undefined;

  constructor(page: Page) {
    this.page = page;
    this.nursing_tab = page.locator('//a[@href="#/Nursing"]');
    this.past_days = page.locator('//a[contains(text(),"Past Days")]');
    this.from_date = page.locator(
      "//tbody/tr/td[3]/danphe-date-picker[1]//input"
    );
    this.ok_button = page.locator('//button[contains(text()," OK ")]');
    this.search_field = page.locator('//input[@id="quickFilterInput"]');
    this.overview_button = page.locator('(//div//i[@title="overview"])[1]');
    this.upload_button = page.locator('(//i[@title="upload files"])[1]');
    this.dept_dropdown = page.locator("//select");
    this.upload_file = page.locator('//input[@type="file"]');
    this.submit_button = page.locator('//input[@value="Submit"]');
    this.checkbox = page.locator("#checkbox_outPatient_selectAllPatients");
    this.conclude = page.locator("//button[text()='Conclude']");
    this.saveButton = page.locator("#add");
  }

  /**
   * @Test2 Verify Navigation to Patient Overview from Past Days Records
   *
   * @param {Record<string, string>} data - Not used in this method but typically used to pass additional parameters if needed.
   * @returns {Promise<void>} - Returns void; logs error if any step fails.
   *
   * Steps:
   * 1. Navigate to https://healthapp.yaksha.com/Home/Index#/Nursing/OutPatient
   * 2. Click on the Past Days tab.
   * 3. Enter the From Date as 01-01-2020 and click the OK button.
   * 4. Search for the patient "Deepika Rani" in the list.
   * 5. Locate the patient’s record and click on Overview from the Actions column.
   */

  async verifyPatientOverviewFromPastDaysRecords() {
    try {
      // Click on the Nursing tab
      await this.nursing_tab.click();
      //click on past days tab
      await this.past_days.click();
      await CommonMethods.highlightElement(this.from_date);
      const fromDateString: string | undefined =
        await testData.DateRange[0].FromDate?.toString();
      const [day, month, year] = fromDateString?.split("-") ?? ["", "", ""];
      const fromDate: Date = new Date(Number(year), Number(month), Number(day));
      const formattedDate: string = fromDate.toISOString().split("T")[0];
      await this.from_date.fill(formattedDate);
      await this.ok_button.click();
      await this.search_field.fill("Last");
      await this.overview_button.click();
      await this.page.waitForURL(
        "**/Nursing/PatientOverviewMain/PatientOverview"
      );
      expect(this.page.url()).toContain(
        "/Nursing/PatientOverviewMain/PatientOverview"
      );
    } catch (error) {
      console.error(
        "Error in verifyPatientOverviewFromPastDaysRecords:",
        error
      );
      throw error; // Rethrow the error to be caught by the test framework
    }
  }

  /**
   * @Test3 Verify File Upload for a Past Patient Record
   *
   * @param {Record<string, string>} data - Not used in this method but typically used to pass additional parameters if needed.
   * @returns {Promise<void>} - Returns void; logs error if any step fails.
   *
   * Steps:
   * 1. Navigate to https://healthapp.yaksha.com/Home/Index#/Nursing/OutPatient
   * 2. Click on the Past Days tab.
   * 3. Enter the From Date as 01-01-2020 and click the OK button.
   * 4. Search for the patient "Deepika Rani" in the list.
   * 5. Locate the patient’s record and click on "Upload files" from the Actions column.
   * 6. Verify that the Upload Files modal opens.
   * 7. Select the Department as "Pathology".
   * 8. Upload an image file.
   * 9. Click on the Submit button.
   */
  async verifyfileupload() {
    try {
      // Click on the Nursing tab
      await this.nursing_tab.click();
      //click on past days tab
      await this.past_days.click();
      await CommonMethods.highlightElement(this.from_date);
      await CommonMethods.highlightElement(this.from_date);
      const fromDateString: string | undefined =
        await testData.DateRange[0].FromDate?.toString();
      const [day, month, year] = fromDateString?.split("-") ?? ["", "", ""];
      const fromDate: Date = new Date(Number(year), Number(month), Number(day));
      const formattedDate: string = fromDate.toISOString().split("T")[0];
      await this.from_date.fill(formattedDate);
      await this.page.keyboard.press("Enter"); //
      await this.search_field.fill("Last");
      await this.upload_button.click();
      await CommonMethods.highlightElement(this.dept_dropdown);
      await this.dept_dropdown.selectOption({ value: "Pathology" });
      const path = require("path");
      const fileName = "inventory_requisition_section.png";
      const filePath = path.resolve(__dirname, `../../screenshots/${fileName}`);
      await this.upload_file.setInputFiles(filePath);
      await this.page.waitForTimeout(5000);
      await this.submit_button.click();
    } catch (error) {
      console.error("Error during file upload:", error);
      throw error;
    }
  }
}
