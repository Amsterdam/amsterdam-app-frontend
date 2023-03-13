import assert from 'chai'
import Screen from './screen'

class HomeScreen extends Screen {
  // HomeModuleButtonAbout,
  // constructionWorkEditorModule,
  // HomeModuleButtonConstructionWork,
  // HomeModuleButtonContact,
  // HomeModuleButtonOpenWasteContainer,
  // HomeModuleButtonRedirects,
  // HomeModuleButtonReportProblem,
  // HomeModuleButtonWasteGuide,
  // welcomeModule,
  get HomeWasteGuideModuleButton() {
    return element(by.id('HomeWasteGuideModuleButton'))
  }

  get HomeOpenWasteContainerModuleButton() {
    return element(by.id('HomeOpenWasteContainerModuleButton'))
  }

  get HomeConstructionWorkModuleButton() {
    return element(by.id('HomeConstructionWorkModuleButton'))
  }

  get HomeReportProblemModuleButton() {
    return element(by.id('HomeReportProblemModuleButton'))
  }

  get HomeContactModuleButton() {
    return element(by.id('HomeContactModuleButton'))
  }

  get HomeRedirectsModuleButton() {
    return element(by.id('HomeRedirectsModuleButton'))
  }

  get HomeAboutModuleButton() {
    return element(by.id('HomeAboutModuleButton'))
  }

  async verifyHomeScreen() {
    await expect(this.gemeenteLogo).toBeVisible()
  }

  async tapModule(module) {
    switch (module) {
      case 'Afvalwijzer':
        await waitFor(this.HomeWasteGuideModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeWasteGuideModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Afvalwijzer')
        break
      case 'Gft-container openen':
        await waitFor(this.HomeOpenWasteContainerModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeOpenWasteContainerModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Gft-container openen')
        break
      case 'Werkzaamheden':
        await waitFor(this.HomeConstructionWorkModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeConstructionWorkModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Werkzaamheden')
        break
      case 'Melding doen':
        await waitFor(this.HomeReportProblemModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeReportProblemModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Melding doen')
        break
      case 'Contact':
        await waitFor(this.HomeContactModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeContactModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Contact')
        break
      case 'Direct regelen':
        await waitFor(this.HomeRedirectsModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeRedirectsModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Direct regelen')
        break
      case 'Over deze app':
        await waitFor(this.HomeAboutModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeAboutModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Over deze app')
        break
      default:
        assert.fail(`The entered section ‘${module}’ is an invalid module`)
    }
  }
}

export default new HomeScreen()
