import {expect} from 'detox'
import {autoBindSteps, loadFeatures} from 'jest-cucumber'
import ConstructionWorkScreen from '../screens/construction-work.screen'
import HomeScreen from '../screens/home.screen'

const features = loadFeatures('e2e/features/construction-work.feature', {
  tagFilter: '@included and not @excluded',
})

const constructionWorkSteps = ({given, when, then, and}) => {
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {notifications: 'YES'},
    })
  })

  given(/ik ben op het werkzaamheden scherm/, async () => {
    await waitFor(element(by.id('WelcomePressableImageAndQuote')))
      .toBeVisible()
      .withTimeout(10000)
    await element(by.id('WelcomePressableImageAndQuote')).tap()
    await waitFor(HomeScreen.HomeModuleButtonConstructionWork)
      .toBeVisible()
      .withTimeout(2000)
    await expect(HomeScreen.HomeModuleButtonConstructionWork).toExist()
    await HomeScreen.HomeModuleButtonConstructionWork.tap()
  })

  then(/de werkzaamheden worden weergegeven met een afbeelding/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkCardProjectMiddenweg,
    ).toBeVisible()
  })

  and(/een titel van het project/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkCardProjectTextTitleMiddenweg,
    ).toBeVisible()
  })

  and(/een ondertitel met een korte beschrijving van het project/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkCardProjectTextSubtitleMiddenweg,
    ).toBeVisible()
    await expect(
      ConstructionWorkScreen.ConstructionWorkCardProjectTextSubtitleMiddenweg,
    ).toHaveLabel('Middenweg, Groot onderhoud')
  })

  when(/ik klik op het zoekveld/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkTextInputNavigator,
    ).toBeVisible()
    await ConstructionWorkScreen.ConstructionWorkTextInputNavigator.tap()
  })

  then(
    /wordt er een nieuw scherm 'Zoek in werkzaamheden' geopend/,
    async () => {
      await waitFor(ConstructionWorkScreen.HeaderTitle)
        .toBeVisible()
        .withTimeout(2000)
      await expect(ConstructionWorkScreen.HeaderTitle).toHaveText(
        'Zoek in werkzaamheden',
      )
    },
  )

  and(/wordt er een zoekveld getoond/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectsTextSearchField,
    ).toBeVisible()
  })
  given(
    /ik ben op de de werkzaamheden detail pagina van project Middenweg/,
    async () => {
      await waitFor(element(by.id('WelcomePressableImageAndQuote')))
        .toBeVisible()
        .withTimeout(10000)
      await element(by.id('WelcomePressableImageAndQuote')).tap()
      await waitFor(HomeScreen.HomeModuleButtonConstructionWork)
        .toBeVisible()
        .withTimeout(2000)
      await expect(HomeScreen.HomeModuleButtonConstructionWork).toExist()
      await HomeScreen.HomeModuleButtonConstructionWork.tap()
      await expect(ConstructionWorkScreen.HeaderTitle).toHaveText(
        'Werkzaamheden',
      )
      await ConstructionWorkScreen.ConstructionWorkCardProjectMiddenweg.tap()
      await expect(ConstructionWorkScreen.HeaderTitle).toHaveText('Middenweg')
    },
  )

  when(/ik klik op de terug knop/, async () => {
    await ConstructionWorkScreen.HeaderButtonBack.tap()
  })

  then(/ik ben in het werkzaamheden scherm/, async () => {
    await expect(ConstructionWorkScreen.HeaderTitle).toHaveText('Werkzaamheden')
  })

  when(/ik klik op project Amstel/, async () => {
    await ConstructionWorkScreen.ConstructionWorkCardProjectAmstel.tap()
  })

  then(/ik ben op het detailscherm van project Amstel/, async () => {
    await expect(ConstructionWorkScreen.HeaderTitle).toHaveText('Amstel')
  })

  then(/ik ben op het homescherm/, async () => {
    await expect(HomeScreen.HomeModuleButtonConstructionWork).toBeVisible()
  })

  and(/ik open het project Stadhouderskade/, async () => {
    await ConstructionWorkScreen.ConstructionWorkCardProjectMiddenweg.swipe(
      'up',
      'fast',
      0.5,
    )
    waitFor(
      ConstructionWorkScreen.ConstructionWorkCardProjectStadhouderskade,
    ).toBeVisible(10)
    await ConstructionWorkScreen.ConstructionWorkCardProjectStadhouderskade.tap()
    await waitFor(ConstructionWorkScreen.HeaderTitle)
      .toBeVisible()
      .withTimeout(2000)
    await expect(ConstructionWorkScreen.HeaderTitle).toHaveText(
      'Stadhouderskade',
    )
  })

  when(/ik volg een project/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowButton,
    ).toHaveLabel('Volgen')
    await ConstructionWorkScreen.ConstructionWorkProjectFollowButton.tap()
  })

  then(/het project krijgt de status 'volgend'/, async () => {
    await expect(
      ConstructionWorkScreen.ConstructionWorkProjectFollowButton,
    ).toHaveLabel('Volgend')
  })
}

autoBindSteps(features, [constructionWorkSteps])
