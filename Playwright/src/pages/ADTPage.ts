import { Page, expect, Locator } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";
import { PatientSearchHelper } from "../tests/reusableMethod";
import jsonData from "../Data/PatientName.json";

export default class ADTPage {
  readonly page: Page;
  public ADT: {
    ADTLink: Locator;
    searchBar: Locator;
    patientName: Locator;
    hospitalSearchBar: Locator;
    patientCode: Locator;
    admittedPatient: Locator;
    searchbar: Locator;
    elipsis: Locator;
    change_doctor: Locator;
    update_button: Locator;
    select_doctor_error: Locator;
    first_counter: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.ADT = {
      ADTLink: page.locator('a[href="#/ADTMain"]'),
      searchBar: page.locator("#quickFilterInput"),
      hospitalSearchBar: page.locator("#id_input_search_using_hospital_no"),
      patientName: page.locator(
        "//div[@role='gridcell' and @col-id='ShortName'][1]"
      ),
      patientCode: page.locator(
        "//div[@role='gridcell' and @col-id='PatientCode'][1]"
      ),
      admittedPatient: page.locator(
        "//a[contains(text(),'Admitted Patients')]"
      ),
      searchbar: page.locator("//input[@id='quickFilterInput']"),
      elipsis: page.locator("(//button[contains(text(),'...')])[1]"),
      change_doctor: page.locator(
        "//div[@class='dropdown open']//a[@danphe-grid-action='changedr']"
      ),
      update_button: page.locator("//button[normalize-space()='Update']"),
      select_doctor_error: page.locator("//span[@class='color-red']"),
      first_counter: page.locator("//h5[text()='New-1 ']"),
    };
  }

  /**
   * @Test10.3 Executes a patient search in the ADT (Admission, Discharge, Transfer) section using a reusable helper function.
   *
   * @description This method navigates to the ADT section by highlighting and clicking the ADT link,
   *              waits for the page to load, and initiates a patient search using the PatientSearchHelper class.
   *              The function verifies successful navigation to the ADT page and performs the search operation.
   *
   * @returns {boolean} - Returns true if the patient search is completed successfully; otherwise, returns false.
   */

  async searchPatientInADT() {
    const patientSearchHelper = new PatientSearchHelper(this.page);
    await CommonMethods.highlightElement(this.ADT.ADTLink);
    await this.ADT.ADTLink.click();
    await this.page.waitForTimeout(2000);
    await patientSearchHelper.searchPatient();
  }

  /**
   * @Test15 Verifies field-level error validation in the "Change Doctor" modal within the ADT module.
   *
   *
   * Steps:
   * 1. Navigate to the ADT module.
   * 2. Click on the “Admitted Patients” tab.
   * 3. Search for a patient using data from the PatientName.json file.
   * 4. Click on the “...” button from the patient row and select “Change Doctor”.
   * 5. In the modal that appears, click the update button without selecting a doctor.
   *
   * Expected Result:
   * - A field-level error message should appear: "Select doctor from the list."
   */

  async verifyInventorySubModuleNavigation() {
    await this.ADT.ADTLink.click();
    //click on first option from popup
    await this.ADT.first_counter.click();
    await this.ADT.admittedPatient.click();
    const patientname = jsonData.patientName;
    await this.ADT.searchbar.fill(patientname);
    await this.ADT.elipsis.click();
    await this.ADT.change_doctor.click();
    await this.ADT.update_button.click();
    const result = await this.ADT.select_doctor_error.isVisible();
  }
}
