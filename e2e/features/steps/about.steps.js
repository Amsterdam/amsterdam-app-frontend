import {expect} from 'detox'
import {loadFeatures, autoBindSteps} from 'jest-cucumber'
import aboutPage from '../pageobjects/about.page'
import homePage from '../pageobjects/home.page'

const features = loadFeatures('e2e/features/about.feature')

const aboutSteps = ({given, when, then, and}) => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true})
    await waitFor(homePage.overDezeAppModule).toBeVisible().withTimeout(10000)
    await homePage.tapModule('Over deze app')
  })

  given('ik ben op de over deze app pagina', async () => {
    await expect(aboutPage.HeaderTitle).toBeVisible()
    await expect(aboutPage.AboutTitleAmsterdam).toBeVisible()
    await expect(aboutPage.HeaderTitle).toHaveText('Over deze app')
    await expect(aboutPage.AboutTitleAmsterdam).toHaveText('Amsterdam App')
  })
  then('ik zie het versie nummer', async () => {
    await expect(aboutPage.AboutTextVersion).toBeVisible()
    await expect(aboutPage.AboutTextVersion).toHaveText(aboutPage.AppVersion)
  })
}
autoBindSteps(features, [aboutSteps])
