const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class NavPage extends Page {
  /**
   * define selectors using getter methods
   */
  get gemeenteLogo() {
    // return $('XCUIElementTypeButton[@name="Afvalwijzer"]')
  }

  // get contact () {
  //     //return $('XCUIElementTypeButton[@name="Afvalwijzer"]');
  //     return $('XCUIElementTypeButton[@name="Contact"]')
  // }

  // async contactClick () {

  //     // await this.contact.waitForClickable();
  //     // await this.contact.click();
  // }

  get contactBtn() {
    // return $('//XCUIElementTypeButton[@name="Contact"]')
  }

  async contactClick() {
    await this.contactBtn.click()
  }
}

module.exports = new NavPage()
