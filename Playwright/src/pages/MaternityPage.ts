import { Locator, Page } from "playwright";

export default class MaternityPage {
  readonly page: Page;
  private maternity: Locator;
  private starIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.maternity = page.locator(
      'a[href="#/Maternity"] >> span.title:has-text("Maternity")'
    );
    this.starIcon = page.locator('i[title="Remember this Date"]');
  }

  /**
   * @Test7 Verify File Upload for a Past Patient Record
   *
   * This method performs the interaction required to retrieve the tooltip text from the star icon.
   * It first waits for the page to fully load and clicks on the "maternity" section to ensure the relevant elements are visible.
   * Then it hovers over the star icon to trigger the tooltip and waits briefly to allow the tooltip to render.
   * Finally, it captures and returns the value of the 'title' attribute, which holds the tooltip text.
   */
  async getTooltipTextFromStar(): Promise<string | null> {
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.maternity.click(),
    ]);
    await this.starIcon.hover();
    await this.page.waitForTimeout(500);
    return await this.starIcon.getAttribute("title");
  }
}
