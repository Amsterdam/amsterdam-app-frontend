const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AboutPage extends Page {
  /**
   * define selectors using getter methods
   */
  get AboutTitleAmsterdam() {
    return element(by.id('AboutTitleAmsterdam'))
  }

  get AboutTextVersion() {
    return element(by.id('AboutTextVersion'))
  }

  get AboutButtonAboutTheAppDutch() {
    return element(by.id('AboutButtonAboutTheAppDutch'))
  }

  get AboutButtonAboutTheAppEnglish() {
    return element(by.id('AboutButtonAboutTheAppEnglish'))
  }

  get AboutButtonPrivacyStatement() {
    return element(by.id('AboutButtonPrivacyStatement'))
  }

  get AboutButtonAccessibilityStatement() {
    return element(by.id('ContactTextContactOptions'))
  }
}

module.exports = new AboutPage()
