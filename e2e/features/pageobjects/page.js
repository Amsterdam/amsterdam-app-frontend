/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
module.exports = class Page {
  get HeaderTitle() {
    return element(by.id('HeaderTitle'))
  }

  get HeaderButtonBack() {
    return element(by.id('HeaderButtonBack'))
  }

  async getElementText(mobileElement) {
    const attributes = await mobileElement.getAttributes()
    return attributes.text
  }
}
