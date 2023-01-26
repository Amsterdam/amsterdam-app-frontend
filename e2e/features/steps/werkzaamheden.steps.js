import {expect} from 'detox'
import {autoBindSteps, loadFeatures} from 'jest-cucumber'
import homePage from '../pageobjects/home.page'
import werkzaamhedenPage from '../pageobjects/werkzaamheden.page'

const features = loadFeatures(
  //'e2e/features/werkzaamheden.overzichtspagina.feature',
  'e2e/features/werkzaamheden.zoeken.feature',
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

  when(/ik klik op het zoekveld/, async () => {
    await expect(
      werkzaamhedenPage.ConstructionWorkTextInputNavigator,
    ).toBeVisible()
    await werkzaamhedenPage.ConstructionWorkTextInputNavigator.tap()
  })

  then(
    /word er een nieuwe pagina 'Zoek in werkzaamheden' geopend/,
    async () => {
      await waitFor(werkzaamhedenPage.HeaderTitle)
        .toBeVisible()
        .withTimeout(2000)
      await expect(werkzaamhedenPage.HeaderTitle).toHaveText(
        'Zoek in werkzaamheden',
      )
    },
  )
}

autoBindSteps(features, [werkzaamhedenSteps])
