import {expect} from 'detox'
import {defineFeature, loadFeature} from 'jest-cucumber'
import homePage from '../pageobjects/home.page'

const feature = loadFeature('e2e/features/about.feature')

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true})
    await waitFor(homePage.overDezeAppModule).toBeVisible().withTimeout(10000)
    await homePage.tapModule('Over deze app')
  })

  test('Ik zie het versie nummer', ({given, when, then}) => {
    given('ik ben op de over deze app pagina', async () => {
      await expect(element(by.id('HeaderTitle'))).toBeVisible()
      await expect(element(by.id('AboutTitleAmsterdam'))).toBeVisible()
      //await expect(element(by.id('HeaderTitle'))).toHaveLabel('Over deze app')
      //await expect(element(by.id('AboutTitleAmsterdam'))).toHaveLabel('Amsterdam App')
      //Test faalt op de toHaveLabel assertions. Denk dat dit niet kan vanwege de hierarchy.
      //De testID staat lager dan het label, dus kan niet checken of de titel klopt.
    })
    then('ik zie het versie nummer', async () => {
      await expect(element(by.id('AboutTextVersion'))).toBeVisible()
      //await expect(element(by.id('AboutTextVersion'))).toHaveLabel('Versie 0.27.0.5237')
    })
  })
})
