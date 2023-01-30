import packageJSON from '../../../package.json'
import Screen from './screen'

/**
 * sub screen containing specific selectors and methods for a specific screen
 */
class AboutScreen extends Screen {
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
    return element(by.id('AboutButtonAccessibilityStatement'))
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

  get AboutWaaromDezeAppScreenHeaderTitle() {
    return element(by.text('1 app voor alle Amsterdammers'))
  }

  get AboutWaaromDezeAppScreenIntroText() {
    return element(
      by.text(
        'Met de Amsterdam app krijgt u snel informatie die voor u belangrijk is. En u kunt zaken makkelijk regelen. Zoals:',
      ),
    )
  }

  get AboutParagraphTitleInformatieOverAfval() {
    return element(by.text('Informatie over afval'))
  }

  get AboutParagraphTitleWerkAanDeWeg() {
    return element(by.text('Werk aan de weg'))
  }

  get AboutParagraphTitleMeldingMaken() {
    return element(by.text('Melding maken'))
  }

  get AboutParagraphTitle1AppVoorNL() {
    return element(by.text('1 app voor alle Amsterdammers en Weespers'))
  }

  get AboutParagraphTitleOnderwerpenToekomst() {
    return element(by.text('Nog meer onderwerpen in de toekomst'))
  }

  get AboutWhyThisAppScreenHeaderTitle() {
    return element(by.text('1 app for all citizens of Amsterdam'))
  }

  get AboutWhyThisAppScreenIntroText() {
    return element(
      by.text(
        'The Amsterdam app quickly provides information tailored to you. Take care of affairs with ease, like:',
      ),
    )
  }

  get AboutParagraphTitleWasteInformation() {
    return element(by.text('Waste information'))
  }

  get AboutParagraphTitleRoadWork() {
    return element(by.text('Road Work'))
  }

  get AboutParagraphTitleReportIt() {
    return element(by.text('Report it'))
  }

  get AboutParagraphTitle1AppVoorEN() {
    return element(by.text('Waste information'))
  }

  get AboutParagraphTitleTopicsFuture() {
    return element(by.text('More topics in the future'))
  }

  get AboutPrivacyScreenHeaderTitle() {
    return element(by.text('Samenvatting privacyverklaring gemeente Amsterdam'))
  }

  get AboutPrivacyScreenFirstParagraph() {
    return element(
      by.text(
        'Als u iets wilt regelen of aanvragen via Amsterdam.nl, dan heeft de gemeente vaak contactgegevens, zoals uw telefoonnummer en e-mailadres, van u nodig om u goed te kunnen helpen.',
      ),
    )
  }

  get AboutParagraphTitlePersoonsgegevens() {
    return element(by.text('Het verwerken van persoonsgegevens'))
  }

  get AboutParagraphTitlePrivacyverklaring() {
    return element(by.text('Algemene versus specifieke privacyverklaring'))
  }

  get AboutButtonGeneralPrivacyStatement() {
    return element(by.id('AboutButtonGeneralPrivacyStatement'))
  }

  get AboutButtonEmailSomethingBroken() {
    return element(by.id('AboutButtonEmailSomethingBroken'))
  }
}

module.exports = new AboutScreen()
