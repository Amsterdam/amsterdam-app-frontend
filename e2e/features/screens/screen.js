/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all screen objects
 */
export default class Screen {
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
