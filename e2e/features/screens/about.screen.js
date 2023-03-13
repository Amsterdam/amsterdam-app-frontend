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

  get aboutTheAppDutchInformatieOverAfvalTitle() {
    return element(by.id('AboutAboutTheAppDutchInformatieOverAfvalTitle'))
  }

  get aboutTheAppDutchWerkAanDeWegTitle() {
    return element(by.id('AboutAboutTheAppDutchWerkAanDeWegTitle'))
  }

  get aboutTheAppDutchMeldingMakenTitle() {
    return element(by.id('AboutAboutTheAppDutchMeldingMakenTitle'))
  }

  get aboutTheAppDutch1AppTitle() {
    return element(by.id('AboutAboutTheAppDutch1AppTitle'))
  }

  get aboutTheAppDutchOnderwerpenToekomstTitle() {
    return element(by.id('AboutAboutTheAppDutchOnderwerpenToekomstTitle'))
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

  get aboutTheAppEnglishReportItTitle() {
    return element(by.id('AboutAboutTheAppEnglishReportItTitle'))
  }

  get aboutTheAppEnglish1AppTitle() {
    return element(by.id('AboutAboutTheAppEnglish1AppTitle'))
  }

  get aboutTheAppEnglishTopicsFutureTitle() {
    return element(by.id('AboutAboutTheAppEnglishTopicsFutureTitle'))
  }

  // Screen: Privacy statement

  get privacyStatementTitle() {
    return element(by.id('AboutPrivacyStatementTitle'))
  }

  get privacyStatementFirstParagraph() {
    return element(by.id('AboutPrivacyStatementFirstParagraph'))
  }

  get privacyStatementPersoonsgegevensTitle() {
    return element(by.id('AboutPrivacyStatementPersoonsgegevensTitle'))
  }

  get privacyStatementAlgemeneSpecifiekeTitle() {
    return element(by.id('AboutPrivacyStatementAlgemeneSpecifiekeTitle'))
  }

  get privacyStatementGeneralButton() {
    return element(by.id('AboutPrivacyStatementGeneralButton'))
  }

  get privacyStatementSpecificButton() {
    return element(by.id('AboutPrivacyStatementSpecificButton'))
  }

  // Screen: Accessibility statement

  get accessibilityStatementSomethingBrokenButton() {
    return element(by.id('AboutAccessibilityStatementSomethingBrokenButton'))
  }
}

module.exports = new AboutScreen()
