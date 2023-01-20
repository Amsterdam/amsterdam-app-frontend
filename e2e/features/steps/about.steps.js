import {expect} from 'detox'
import {loadFeatures, autoBindSteps} from 'jest-cucumber'
import aboutPage from '../pageobjects/about.page'
import homePage from '../pageobjects/home.page'

const features = loadFeatures('e2e/features/about.feature', {
  tagFilter: '@included and not @excluded',
})

const aboutSteps = ({given, when, then, and}) => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true})
    await waitFor(element(by.id('WelcomePressableImageAndQuote')))
      .toBeVisible()
      .withTimeout(10000)
    await element(by.id('WelcomePressableImageAndQuote')).tap()
    await homePage.tapModule('Over deze app')
  })

  given(/ik ben op de over deze app pagina/, async () => {
    await expect(aboutPage.HeaderTitle).toBeVisible()
    await expect(aboutPage.AboutTitleAmsterdam).toBeVisible()
    await expect(aboutPage.HeaderTitle).toHaveText('Over deze app')
    await expect(aboutPage.AboutTitleAmsterdam).toHaveText('Amsterdam App')
  })
  then(/ik zie het versie nummer/, async () => {
    await expect(aboutPage.AboutTextVersion).toBeVisible()
    await expect(aboutPage.AboutTextVersion).toHaveText(aboutPage.AppVersion)
  })

  when(/ik klik op 'Waarom deze app\?'/, async () => {
    await aboutPage.AboutButtonAboutTheAppDutch.tap()
  })

  then(/ik zie een pagina met uitleg over de app/, async () => {
    await waitFor(aboutPage.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(aboutPage.HeaderTitle).toHaveText('Waarom deze app?')
    await waitFor(aboutPage.AboutWaaromDezeAppPageHeaderTitle)
      .toBeVisible()
      .withTimeout(2000)
    expect(aboutPage.AboutParagraphTitleInformatieOverAfval).toBeVisible
    await aboutPage.AboutParagraphTitleInformatieOverAfval.swipe(
      'up',
      'fast',
      0.3,
    )
    await expect(aboutPage.AboutParagraphTitleWerkAanDeWeg).toBeVisible()
    await expect(aboutPage.AboutParagraphTitleMeldingMaken).toBeVisible()
    await aboutPage.AboutParagraphTitleMeldingMaken.swipe('up')
    await expect(aboutPage.AboutParagraphTitle1AppVoorNL).toBeVisible()
    await expect(aboutPage.AboutParagraphTitleOnderwerpenToekomst).toBeVisible()
  })

  when(/ik klik op 'About this app'/, async () => {
    await aboutPage.AboutButtonAboutTheAppEnglish.tap()
  })

  then(/ik zie een pagina met uitleg over deze app in het Engels/, async () => {
    await waitFor(aboutPage.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(aboutPage.HeaderTitle).toHaveText('About this app')
    await waitFor(aboutPage.AboutWhyThisAppPageHeaderTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(aboutPage.AboutWhyThisAppPageIntroText).toBeVisible()
    await expect(aboutPage.AboutParagraphTitleWasteInformation).toBeVisible()
    await aboutPage.AboutParagraphTitleWasteInformation.swipe('up', 'fast', 0.3)
    waitFor(aboutPage.AboutParagraphTitleRoadWork)
      .toBeVisible()
      .withTimeout(2000)
    await expect(element(by.text('Road Work'))).toBeVisible()
    await expect(aboutPage.AboutParagraphTitleReportIt).toBeVisible()
    await aboutPage.AboutParagraphTitleReportIt.swipe('up')
    waitFor(aboutPage.AboutParagraphTitle1AppVoorEN)
      .toBeVisible()
      .withTimeout(2000)
    await expect(aboutPage.AboutParagraphTitle1AppVoorEN).toBeVisible()
    await expect(aboutPage.AboutParagraphTitleTopicsFuture).toBeVisible()
  })

  when(/ik klik op 'Privacyverklaring'/, async () => {
    await aboutPage.AboutButtonPrivacyStatement.tap()
  })

  then(/ik zie een pagina met de Privacyverklaring/, async () => {
    await waitFor(aboutPage.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(aboutPage.HeaderTitle).toHaveText('Privacyverklaring')
    await waitFor(aboutPage.AboutPrivacyPageHeaderTitle)
      .toBeVisible()
      .withTimeout(2000)
    await element(aboutPage.AboutPrivacyPageFirstParagraph).swipe(
      'up',
      'fast',
      0.5,
    )
    await expect(aboutPage.AboutParagraphTitlePersoonsgegevens).toBeVisible()
    await expect(aboutPage.AboutParagraphTitlePrivacyverklaring).toBeVisible()
    await aboutPage.AboutParagraphTitlePrivacyverklaring.swipe('up')
    await expect(aboutPage.AboutButtonGeneralPrivacyStatement).toBeVisible()
    await expect(aboutPage.AboutButtonSpecificPrivacyStatement).toBeVisible()
  })

  when(/ik klik op 'Toegankelijkheidsverklaring'/, async () => {
    await aboutPage.AboutButtonAccessibilityStatement.tap()
  })

  then(/ik zie een pagina met de Toegankelijkheidsverklaring/, async () => {
    await waitFor(aboutPage.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(aboutPage.HeaderTitle).toHaveText(
      'Toegankelijkheidsverklaring',
    )
  })

  and(/ik kan een mail sturen als er iets niet werkt/, async () => {
    await element(by.text('Genomen maatregelen')).swipe('up')
    await element(by.text('Werkt iets niet?')).swipe('up')
    await expect(aboutPage.AboutButtonEmailSomethingBroken).toBeVisible()
  })
}

autoBindSteps(features, [aboutSteps])
