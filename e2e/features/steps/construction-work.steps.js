import {expect} from 'detox'
import {autoBindSteps, loadFeatures} from 'jest-cucumber'
import ConstructionWorkScreen from '../screens/construction-work.screen'
import HomeScreen from '../screens/home.screen'

const features = loadFeatures('e2e/features/construction-work.feature', {
  tagFilter: '@included and not @excluded',
})

const constructionWorkSteps = ({given, when, then, and}) => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true})
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
}

autoBindSteps(features, [constructionWorkSteps])
