import {expect} from 'detox'
import {autoBindSteps, loadFeatures} from 'jest-cucumber'
import ConstructionWorkScreen from '../screens/construction-work.screen'
import HomeScreen from '../screens/home.screen'

const features = loadFeatures(
  'e2e/features/construction-work-follow-projects.feature',
  {
    tagFilter: '@included and not @excluded',
  },
)

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
    await expect(HomeScreen.werkzaamhedenModule).toExist()
    await HomeScreen.werkzaamhedenModule.tap()
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
