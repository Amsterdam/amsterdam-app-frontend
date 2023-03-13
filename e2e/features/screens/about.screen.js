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
    return element(by.text('1 app voor alle Amsterdammers'))
  }

  get AboutAboutTheAppDutchIntroParagraph() {
    return element(
      by.text(
        'Met de Amsterdam app krijgt u snel informatie die voor u belangrijk is. En u kunt zaken makkelijk regelen. Zoals:',
      ),
    )
  }

  get AboutAboutTheAppDutchInformatieOverAfvalTitle() {
    return element(by.text('Informatie over afval'))
  }

  get AboutAboutTheAppDutchWerkAanDeWegTitle() {
    return element(by.text('Werk aan de weg'))
  }

  get AboutAboutTheAppDutchMeldingMakenTitle() {
    return element(by.text('Melding maken'))
  }

  get AboutAboutTheAppDutch1AppTitle() {
    return element(by.text('1 app voor alle Amsterdammers en Weespers'))
  }

  get AboutAboutTheAppDutchOnderwerpenToekomstTitle() {
    return element(by.text('Nog meer onderwerpen in de toekomst'))
  }

  // Screen: About the app (English)

  get AboutAboutTheAppEnglish1AppTitle() {
    return element(by.text('1 app for all citizens of Amsterdam'))
  }

  get AboutAboutTheAppEnglishIntroParagraph() {
    return element(
      by.text(
        'The Amsterdam app quickly provides information tailored to you. Take care of affairs with ease, like:',
      ),
    )
  }

  get AboutAboutTheAppEnglishWasteInformationTitle() {
    return element(by.text('Waste information'))
  }

  get AboutAboutTheAppEnglishRoadWorkTitle() {
    return element(by.text('Road Work'))
  }

  get AboutAboutTheAppEnglishReportItTitle() {
    return element(by.text('Report it'))
  }

  get AboutAboutTheAppEnglishTopicsFutureTitle() {
    return element(by.text('More topics in the future'))
  }

  // Screen: Privacy statement

  get AboutPrivacyStatementTitle() {
    return element(by.text('Samenvatting privacyverklaring gemeente Amsterdam'))
  }

  get AboutPrivacyStatementFirstParagraph() {
    return element(
      by.text(
        'Als u iets wilt regelen of aanvragen via Amsterdam.nl, dan heeft de gemeente vaak contactgegevens, zoals uw telefoonnummer en e-mailadres, van u nodig om u goed te kunnen helpen.',
      ),
    )
  }

  get AboutPrivacyStatementPersoonsgegevensTitle() {
    return element(by.text('Het verwerken van persoonsgegevens'))
  }

  get AboutPrivacyStatementGeneralVersusSpecificTitle() {
    return element(by.text('Algemene versus specifieke privacyverklaring'))
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
