import packageJSON from '../../../package.json'
import Screen from './screen'

class AboutScreen extends Screen {
  // Screen: About module

  get amsterdamAppTitle() {
    return element(by.id('AboutAmsterdamAppTitle'))
  }

  get versionNumberText() {
    return element(by.id('AboutVersionNumberText'))
  }

  get aboutTheAppDutchButton() {
    return element(by.id('AboutAboutTheAppDutchButton'))
  }

  get aboutTheAppEnglishButton() {
    return element(by.id('AboutAboutTheAppEnglishButton'))
  }

  get privacyStatementButton() {
    return element(by.id('AboutPrivacyStatementButton'))
  }

  get accessibilityStatementButton() {
    return element(by.id('AboutAccessibilityStatementButton'))
  }

  get releaseVersionNumber() {
    const buildNumber = parseInt(
      require('child_process')
        .execSync('git rev-list --count HEAD')
        .toString()
        .trim(),
      10,
    )
    const versionNo = packageJSON.version
    const appVersion = 'Versie ' + versionNo + '.' + buildNumber
    return appVersion
  }

  // Screen: About the app (Dutch)

  get aboutTheAppDutchTitle() {
    return element(by.id('AboutAboutTheAppDutchTitle'))
  }

  get aboutTheAppDutchIntroParagraph() {
    return element(by.id('AboutAboutTheAppDutchIntroParagraph'))
  }

  get aboutTheAppDutchWasteInformationTitle() {
    return element(by.id('AboutAboutTheAppDutchWasteInformationTitle'))
  }

  get aboutTheAppDutchRoadWorkTitle() {
    return element(by.id('AboutAboutTheAppDutchRoadWorkTitle'))
  }

  get aboutTheAppDutchReportProblemTitle() {
    return element(by.id('AboutAboutTheAppDutchReportProblemTitle'))
  }

  get aboutTheAppDutch1AppTitle() {
    return element(by.id('AboutAboutTheAppDutch1AppTitle'))
  }

  get aboutTheAppDutchFutureFeaturesTitle() {
    return element(by.id('AboutAboutTheAppDutchFutureFeaturesTitle'))
  }

  // Screen: About the app (English)

  get aboutTheAppEnglishTitle() {
    return element(by.id('AboutAboutTheAppEnglish1AppTitle'))
  }

  get aboutTheAppEnglishIntroParagraph() {
    return element(by.id('AboutAboutTheAppEnglishIntroParagraph'))
  }

  get aboutTheAppEnglishWasteInformationTitle() {
    return element(by.id('AboutAboutTheAppEnglishWasteInformationTitle'))
  }

  get aboutTheAppEnglishRoadWorkTitle() {
    return element(by.id('AboutAboutTheAppEnglishRoadWorkTitle'))
  }

  get aboutTheAppEnglishReportProblemTitle() {
    return element(by.id('AboutAboutTheAppEnglishReportProblemTitle'))
  }

  get aboutTheAppEnglish1AppTitle() {
    return element(by.id('AboutAboutTheAppEnglish1AppTitle'))
  }

  get aboutTheAppEnglishFutureFeaturesTitle() {
    return element(by.id('AboutAboutTheAppEnglishFutureFeaturesTitle'))
  }

  // Screen: Privacy statement

  get privacyStatementTitle() {
    return element(by.id('AboutPrivacyStatementTitle'))
  }

  get privacyStatementParagraph() {
    return element(by.id('AboutPrivacyStatementParagraph'))
  }

  get privacyStatementPersonalDataTitle() {
    return element(by.id('AboutPrivacyStatementPersonalDataTitle'))
  }

  get privacyStatementLinksTitle() {
    return element(by.id('AboutPrivacyStatementLinksTitle'))
  }

  get privacyStatementGeneralLink() {
    return element(by.id('AboutPrivacyStatementGeneralLink'))
  }

  get privacyStatementSpecificLink() {
    return element(by.id('AboutPrivacyStatementSpecificLink'))
  }

  // Screen: Accessibility statement

  get accessibilityStatementSomethingBrokenButton() {
    return element(by.id('AboutAccessibilityStatementSomethingBrokenButton'))
  }
}

module.exports = new AboutScreen()
