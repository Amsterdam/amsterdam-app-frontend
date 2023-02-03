const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WerkzaamhedenPage extends Page {
  /**
   * define selectors using getter methods
   */
  get WerkzaamhedenModule() {
    return element(by.id(''))
  }

  get ConstructionWorkTextInputNavigator() {
    return element(by.id('ConstructionWorkTextInputNavigator'))
  }
}

module.exports = new WerkzaamhedenPage()
