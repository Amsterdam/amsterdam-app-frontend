import {expect} from 'detox'
import {autoBindSteps, loadFeatures} from 'jest-cucumber'
import AboutScreen from '../screens/about.screen'
import HomeScreen from '../screens/home.screen'
import WelcomeScreen from '../screens/welcome.screen'

const features = loadFeatures('e2e/features/about.feature', {
  tagFilter: '@included and not @excluded',
})

const aboutSteps = ({given, when, then, and}) => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true})
    await WelcomeScreen.tapWelcomeScreen()
    await HomeScreen.tapModule('Over deze app')
  })

  given(/ik ben op het over deze app scherm/, async () => {
    await expect(AboutScreen.HeaderTitle).toBeVisible()
    await expect(AboutScreen.AboutAmsterdamAppTitle).toBeVisible()
    await expect(AboutScreen.HeaderTitle).toHaveText('Over deze app')
    await expect(AboutScreen.AboutAmsterdamAppTitle).toHaveText('Amsterdam App')
  })

  then(/ik zie het versie nummer/, async () => {
    await expect(AboutScreen.AboutVersionNumberText).toBeVisible()
    await expect(AboutScreen.AboutVersionNumberText).toHaveText(
      AboutScreen.AppVersion,
    )
  })

  when(/ik klik op 'Waarom deze app\?'/, async () => {
    await AboutScreen.AboutAboutTheAppDutchButton.tap()
  })

  then(/ik zie een scherm met uitleg over de app/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText('Waarom deze app?')
    await waitFor(AboutScreen.AboutAboutTheAppDutchTitle)
      .toBeVisible()
      .withTimeout(2000)
    expect(AboutScreen.AboutAboutTheAppDutchInformatieOverAfvalTitle)
      .toBeVisible
    await AboutScreen.AboutAboutTheAppDutchInformatieOverAfvalTitle.swipe(
      'up',
      'fast',
      0.3,
    )
    await expect(
      AboutScreen.AboutAboutTheAppDutchWerkAanDeWegTitle,
    ).toBeVisible()
    await expect(
      AboutScreen.AboutAboutTheAppDutchMeldingMakenTitle,
    ).toBeVisible()
    await AboutScreen.AboutAboutTheAppDutchMeldingMakenTitle.swipe('up')
    await expect(AboutScreen.AboutAboutTheAppDutch1AppTitle).toBeVisible()
    await expect(
      AboutScreen.AboutAboutTheAppDutchOnderwerpenToekomstTitle,
    ).toBeVisible()
  })

  when(/ik klik op 'About this app'/, async () => {
    await AboutScreen.AboutAboutTheAppEnglishButton.tap()
  })

  then(/ik zie een scherm met uitleg over deze app in het Engels/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText('About this app')
    await waitFor(AboutScreen.AboutAboutTheAppEnglishTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(
      AboutScreen.AboutAboutTheAppEnglishIntroParagraph,
    ).toBeVisible()
    await expect(
      AboutScreen.AboutAboutTheAppEnglishWasteInformationTitle,
    ).toBeVisible()
    await AboutScreen.AboutAboutTheAppEnglishWasteInformationTitle.swipe(
      'up',
      'fast',
      0.3,
    )
    await waitFor(AboutScreen.AboutAboutTheAppEnglishRoadWorkTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(element(by.text('Road Work'))).toBeVisible()
    await expect(AboutScreen.AboutAboutTheAppEnglishReportItTitle).toBeVisible()
    await AboutScreen.AboutAboutTheAppEnglishReportItTitle.swipe('up')
    await waitFor(AboutScreen.AboutAboutTheAppEnglish1AppTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(AboutScreen.AboutAboutTheAppEnglish1AppTitle).toBeVisible()
    await expect(
      AboutScreen.AboutAboutTheAppEnglishTopicsFutureTitle,
    ).toBeVisible()
  })

  when(/ik klik op 'Privacyverklaring'/, async () => {
    await AboutScreen.AboutPrivacyStatementButton.tap()
  })

  then(/ik zie een scherm met de Privacyverklaring/, async () => {
    await waitFor(AboutScreen.HeaderTitle).toBeVisible().withTimeout(2000)
    await expect(AboutScreen.HeaderTitle).toHaveText('Privacyverklaring')
    await waitFor(AboutScreen.AboutPrivacyStatementTitle)
      .toBeVisible()
      .withTimeout(2000)
    await element(AboutScreen.AboutPrivacyStatementFirstParagraph).swipe(
      'up',
      'fast',
      0.5,
    )
    await expect(
      AboutScreen.AboutPrivacyStatementPersoonsgegevensTitle,
    ).toBeVisible()
    await expect(
      AboutScreen.AboutPrivacyStatementAlgemeneSpecifiekeTitle,
    ).toBeVisible()
    await AboutScreen.AboutPrivacyStatementAlgemeneSpecifiekeTitle.swipe('up')
    await expect(AboutScreen.AboutPrivacyStatementGeneralButton).toBeVisible()
    await expect(AboutScreen.AboutPrivacyStatementSpecificButton).toBeVisible()
  })

  when(/ik klik op 'Toegankelijkheidsverklaring'/, async () => {
    await AboutScreen.AboutAccessibilityStatementButton.tap()
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
    await expect(
      AboutScreen.AboutAccessibilityStatementSomethingBrokenButton,
    ).toBeVisible()
  })
}

autoBindSteps(features, [aboutSteps])
