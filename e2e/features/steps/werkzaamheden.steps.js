import {expect} from 'detox'
import {autoBindSteps, loadFeatures} from 'jest-cucumber'
import homePage from '../pageobjects/home.page'
import werkzaamhedenPage from '../pageobjects/werkzaamheden.page'

const features = loadFeatures(
  'e2e/features/werkzaamheden.overzichtspagina.feature',
  {
    tagFilter: '@included and not @excluded',
  },
)

const werkzaamhedenSteps = ({given, when, then, and}) => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true})
  })

  given(/ik ben op de werkzaamheden pagina/, async () => {
    await waitFor(element(by.id('WelcomePressableImageAndQuote')))
      .toBeVisible()
      .withTimeout(10000)
    await element(by.id('WelcomePressableImageAndQuote')).tap()
    await expect(homePage.werkzaamhedenModule).toExist()
    await homePage.werkzaamhedenModule.tap()
  })

  then(/de werkzaamheden worden weergegeven met een afbeelding/, async () => {
    await expect(
      werkzaamhedenPage.ConstructionWorkCardProjectMiddenweg,
    ).toBeVisible()
  })

  and(/een titel van het project/, async () => {
    await expect(
      werkzaamhedenPage.ConstructionWorkCardProjectTextTitleMiddenweg,
    ).toBeVisible()
  })

  and(/een ondertitel met een korte beschrijving van het project/, async () => {
    await expect(
      werkzaamhedenPage.ConstructionWorkCardProjectTextSubtitleMiddenweg,
    ).toBeVisible()
    await expect(
      werkzaamhedenPage.ConstructionWorkCardProjectTextSubtitleMiddenweg,
    ).toHaveLabel('Middenweg, Groot onderhoud')
  })
}

autoBindSteps(features, [werkzaamhedenSteps])
