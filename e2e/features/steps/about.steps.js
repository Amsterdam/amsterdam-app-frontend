import {expect} from 'detox'
import {autoBindSteps, loadFeatures} from 'jest-cucumber'
import AboutScreen from '../screens/about.screen'
import HomeScreen from '../screens/home.screen'

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
    await HomeScreen.tapModule('Over deze app')
  })

  given(/ik ben op het over deze app scherm/, async () => {
    await expect(AboutScreen.HeaderTitle).toBeVisible()
    await expect(AboutScreen.AboutTitleAmsterdam).toBeVisible()
    await expect(AboutScreen.HeaderTitle).toHaveText('Over deze app')
    await expect(AboutScreen.AboutTitleAmsterdam).toHaveText('Amsterdam App')
  })

  then(/ik zie het versie nummer/, async () => {
    await expect(AboutScreen.AboutTextVersion).toBeVisible()
    await expect(AboutScreen.AboutTextVersion).toHaveText(
      AboutScreen.AppVersion,
    )
  })

  when(/ik klik op 'Waarom deze app\?'/, async () => {
    await AboutScreen.AboutButtonAboutTheAppDutch.tap()
  })

  then(/ik zie een scherm met uitleg over de app/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText('Waarom deze app?')
    await waitFor(AboutScreen.AboutWaaromDezeAppPageHeaderTitle)
      .toBeVisible()
      .withTimeout(2000)
    expect(AboutScreen.AboutParagraphTitleInformatieOverAfval).toBeVisible
    await AboutScreen.AboutParagraphTitleInformatieOverAfval.swipe(
      'up',
      'fast',
      0.3,
    )
    await expect(AboutScreen.AboutParagraphTitleWerkAanDeWeg).toBeVisible()
    await expect(AboutScreen.AboutParagraphTitleMeldingMaken).toBeVisible()
    await AboutScreen.AboutParagraphTitleMeldingMaken.swipe('up')
    await expect(AboutScreen.AboutParagraphTitle1AppVoorNL).toBeVisible()
    await expect(
      AboutScreen.AboutParagraphTitleOnderwerpenToekomst,
    ).toBeVisible()
  })

  when(/ik klik op 'About this app'/, async () => {
    await AboutScreen.AboutButtonAboutTheAppEnglish.tap()
  })

  then(/ik zie een scherm met uitleg over deze app in het Engels/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText('About this app')
    await waitFor(AboutScreen.AboutWhyThisAppPageHeaderTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(AboutScreen.AboutWhyThisAppPageIntroText).toBeVisible()
    await expect(AboutScreen.AboutParagraphTitleWasteInformation).toBeVisible()
    await AboutScreen.AboutParagraphTitleWasteInformation.swipe(
      'up',
      'fast',
      0.3,
    )
    waitFor(AboutScreen.AboutParagraphTitleRoadWork)
      .toBeVisible()
      .withTimeout(2000)
    await expect(element(by.text('Road Work'))).toBeVisible()
    await expect(AboutScreen.AboutParagraphTitleReportIt).toBeVisible()
    await AboutScreen.AboutParagraphTitleReportIt.swipe('up')
    waitFor(AboutScreen.AboutParagraphTitle1AppVoorEN)
      .toBeVisible()
      .withTimeout(2000)
    await expect(AboutScreen.AboutParagraphTitle1AppVoorEN).toBeVisible()
    await expect(AboutScreen.AboutParagraphTitleTopicsFuture).toBeVisible()
  })

  when(/ik klik op 'Privacyverklaring'/, async () => {
    await AboutScreen.AboutButtonPrivacyStatement.tap()
  })

  then(/ik zie een scherm met de Privacyverklaring/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText('Privacyverklaring')
    await waitFor(AboutScreen.AboutPrivacyPageHeaderTitle)
      .toBeVisible()
      .withTimeout(2000)
    await element(AboutScreen.AboutPrivacyPageFirstParagraph).swipe(
      'up',
      'fast',
      0.5,
    )
    await expect(AboutScreen.AboutParagraphTitlePersoonsgegevens).toBeVisible()
    await expect(AboutScreen.AboutParagraphTitlePrivacyverklaring).toBeVisible()
    await AboutScreen.AboutParagraphTitlePrivacyverklaring.swipe('up')
    await expect(AboutScreen.AboutButtonGeneralPrivacyStatement).toBeVisible()
    await expect(AboutScreen.AboutButtonSpecificPrivacyStatement).toBeVisible()
  })

  when(/ik klik op 'Toegankelijkheidsverklaring'/, async () => {
    await AboutScreen.AboutButtonAccessibilityStatement.tap()
  })

  then(/ik zie een scherm met de Toegankelijkheidsverklaring/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText(
      'Toegankelijkheidsverklaring',
    )
  })

  and(/ik kan een mail sturen als er iets niet werkt/, async () => {
    await element(by.text('Genomen maatregelen')).swipe('up')
    await element(by.text('Werkt iets niet?')).swipe('up')
    await expect(AboutScreen.AboutButtonEmailSomethingBroken).toBeVisible()
  })
}

autoBindSteps(features, [aboutSteps])
