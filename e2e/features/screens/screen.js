export default class Screen {
  async getElementText(element) {
    const attributes = await element.getAttributes()
    return attributes.text
  }

  get headerBackButton() {
    return element(by.id('HeaderBackButton'))
  }

  get headerTitle() {
    return element(by.id('HeaderTitle'))
  }
}
