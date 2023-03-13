import packageJSON from '../../../package.json'
import Screen from './screen'

class AboutScreen extends Screen {
  // Screen: About module

  get AboutAmsterdamAppTitle() {
    return element(by.id('AboutAmsterdamAppTitle'))
  }

  get AboutVersionNumberText() {
    return element(by.id('AboutVersionNumberText'))
  }

  get AboutAboutTheAppDutchButton() {
    return element(by.id('AboutAboutTheAppDutchButton'))
  }

  get AboutAboutTheAppEnglishButton() {
    return element(by.id('AboutAboutTheAppEnglishButton'))
  }

  get AboutPrivacyStatementButton() {
    return element(by.id('AboutPrivacyStatementButton'))
  }

  get AboutAccessibilityStatementButton() {
    return element(by.id('AboutAccessibilityStatementButton'))
  }

  get AppVersion() {
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

  get AboutAboutTheAppDutchTitle() {
    return element(by.id('AboutAboutTheAppDutchTitle'))
  }

  get AboutAboutTheAppDutchIntroParagraph() {
    return element(by.id('AboutAboutTheAppDutchIntroParagraph'))
  }

  get AboutAboutTheAppDutchInformatieOverAfvalTitle() {
    return element(by.id('AboutAboutTheAppDutchInformatieOverAfvalTitle'))
  }

  get AboutAboutTheAppDutchWerkAanDeWegTitle() {
    return element(by.id('AboutAboutTheAppDutchWerkAanDeWegTitle'))
  }

  get AboutAboutTheAppDutchMeldingMakenTitle() {
    return element(by.id('AboutAboutTheAppDutchMeldingMakenTitle'))
  }

  get AboutAboutTheAppDutch1AppTitle() {
    return element(by.id('AboutAboutTheAppDutch1AppTitle'))
  }

  get AboutAboutTheAppDutchOnderwerpenToekomstTitle() {
    return element(by.id('AboutAboutTheAppDutchOnderwerpenToekomstTitle'))
  }

  // Screen: About the app (English)

  get AboutAboutTheAppEnglishTitle() {
    return element(by.id('AboutAboutTheAppEnglish1AppTitle'))
  }

  get AboutAboutTheAppEnglishIntroParagraph() {
    return element(by.id('AboutAboutTheAppEnglishIntroParagraph'))
  }

  get AboutAboutTheAppEnglishWasteInformationTitle() {
    return element(by.id('AboutAboutTheAppEnglishWasteInformationTitle'))
  }

  get AboutAboutTheAppEnglishRoadWorkTitle() {
    return element(by.id('AboutAboutTheAppEnglishRoadWorkTitle'))
  }

  get AboutAboutTheAppEnglishReportItTitle() {
    return element(by.id('AboutAboutTheAppEnglishReportItTitle'))
  }

  get AboutAboutTheAppEnglish1AppTitle() {
    return element(by.id('AboutAboutTheAppEnglish1AppTitle'))
  }

  get AboutAboutTheAppEnglishTopicsFutureTitle() {
    return element(by.id('AboutAboutTheAppEnglishTopicsFutureTitle'))
  }

  // Screen: Privacy statement

  get AboutPrivacyStatementTitle() {
    return element(by.id('AboutPrivacyStatementTitle'))
  }

  get AboutPrivacyStatementFirstParagraph() {
    return element(by.id('AboutPrivacyStatementFirstParagraph'))
  }

  get AboutPrivacyStatementPersoonsgegevensTitle() {
    return element(by.id('AboutPrivacyStatementPersoonsgegevensTitle'))
  }

  get AboutPrivacyStatementAlgemeneSpecifiekeTitle() {
    return element(by.id('AboutPrivacyStatementAlgemeneSpecifiekeTitle'))
  }

  get AboutPrivacyStatementGeneralButton() {
    return element(by.id('AboutPrivacyStatementGeneralButton'))
  }

  get AboutPrivacyStatementSpecificButton() {
    return element(by.id('AboutPrivacyStatementSpecificButton'))
  }

  // Screen: Accessibility statement

  get AboutAccessibilityStatementSomethingBrokenButton() {
    return element(by.id('AboutAccessibilityStatementSomethingBrokenButton'))
  }
}

module.exports = new AboutScreen()
