import { Page, Locator } from "playwright";
import { CommonMethods } from "../tests/commonMethods";
import testData from "../Data/testData.json";

export default class LaboratoryPage {
  private page: Page;
  private laboratoryLink: Locator;
  private laboratoryDashboard: Locator;
  private sampleCollectionTab: Locator;
  private from_date: Locator;
  private ok_button: Locator;
  private col_requestingDept: Locator;
  private requestdept_hamburger: Locator;
  private select_dropdown: Locator;
  private start_with_option: Locator;
  private req_dept_search: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.laboratoryLink = page.locator('a[href="#/Lab"]');
    this.laboratoryDashboard = page.locator('a[href="#/Lab/Dashboard"]');
    this.sampleCollectionTab = page.locator(
      '//a[text()=" Sample Collection "]'
    );
    this.from_date = page.locator(
      "//tbody/tr/td[3]/danphe-date-picker[1]//input"
    );
    this.ok_button = page.locator('//button[contains(text()," OK ")]');
    this.col_requestingDept = page.locator(
      '//span[normalize-space()="Requesting Dept."]'
    );
    this.requestdept_hamburger = page.locator(
      "//div[@col-id='WardName']//span[@class='ag-icon ag-icon-menu']"
    );
    this.select_dropdown = page.locator("//select[@id='filterType']");
    this.start_with_option = page.locator(
      "//select/option[@value='startsWith']"
    );
    this.req_dept_search = page.locator("//input[@id='filterText']");
  }

  /**
   * @Test9 Verify table filtering for "Male Ward"
   *
   * 1. Navigate to https://healthapp.yaksha.com/Home/Index#/Lab/Dashboard
   * 2. Select the Sample Collections tab.
   * 3. Enter From Date as 01-01-2020 and click OK.
   * 4. Hover over the Requesting Department column and click Hamburger Menu.
   * 5. Select Starts with from the dropdown.
   * 6. Enter Male Ward in the text field.
   *
   *
   */

  async verifyTableFiltering() {
    try {
      await CommonMethods.highlightElement(this.laboratoryLink);
      await this.laboratoryLink.click();
      await CommonMethods.highlightElement(this.laboratoryDashboard);
      await this.laboratoryDashboard.click();
      await this.sampleCollectionTab.click();
      await CommonMethods.highlightElement(this.from_date);
      const fromDateString: string | undefined =
        await testData.DateRange[0].FromDate?.toString();
      const [day, month, year] = fromDateString?.split("-") ?? ["", "", ""];
      const fromDate: Date = new Date(Number(year), Number(month), Number(day));
      const formattedDate: string = fromDate.toISOString().split("T")[0];
      await this.from_date.fill(formattedDate);
      await this.ok_button.click();
      await CommonMethods.highlightElement(this.col_requestingDept);
      await this.col_requestingDept.hover();
      await CommonMethods.highlightElement(this.requestdept_hamburger);
      await this.requestdept_hamburger.click();
      await CommonMethods.highlightElement(this.select_dropdown);
      await this.select_dropdown.selectOption("startsWith");
      await CommonMethods.highlightElement(this.start_with_option);
      // await this.start_with_option.click();
      await this.req_dept_search.fill("male");
      const maleWardcountElements = await this.page.locator(
        '//div[@col-id="WardName" and contains(text(),"Male Ward")]'
      );
      const malewardcount = await maleWardcountElements.count();
      // const malewardcount = await this.male_ward.count();
      if (malewardcount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error in verifyTableFiltering:", error);
      return false;
    }
  }
}
