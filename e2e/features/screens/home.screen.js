import assert from 'chai'
import Screen from './screen'

class HomeScreen extends Screen {
  // HomeAboutModuleButton,
  // constructionWorkEditorModule,
  // HomeConstructionWorkModuleButton,
  // HomeContactModuleButton,
  // HomeOpenWasteContainerModuleButton,
  // HomeRedirectsModuleButton,
  // HomeReportProblemModuleButton,
  // HomeWasteGuideModuleButton,
  // welcomeModule,
  get wasteGuideModuleButton() {
    return element(by.id('HomeWasteGuideModuleButton'))
  }

  get openWasteContainerModuleButton() {
    return element(by.id('HomeOpenWasteContainerModuleButton'))
  }

  get constructionWorkModuleButton() {
    return element(by.id('HomeConstructionWorkModuleButton'))
  }

  get reportProblemModuleButton() {
    return element(by.id('HomeReportProblemModuleButton'))
  }

  get contactModuleButton() {
    return element(by.id('HomeContactModuleButton'))
  }

  get redirectsModuleButton() {
    return element(by.id('HomeRedirectsModuleButton'))
  }

  get aboutModuleButton() {
    return element(by.id('HomeAboutModuleButton'))
  }

  async verifyHomeScreen() {
    await expect(this.gemeenteLogo).toBeVisible()
  }

  async tapModule(module) {
    switch (module) {
      case 'Afvalwijzer':
        await waitFor(this.wasteGuideModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.wasteGuideModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Afvalwijzer')
        break
      case 'Gft-container openen':
        await waitFor(this.openWasteContainerModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.openWasteContainerModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Gft-container openen')
        break
      case 'Werkzaamheden':
        await waitFor(this.constructionWorkModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.constructionWorkModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Werkzaamheden')
        break
      case 'Melding doen':
        await waitFor(this.reportProblemModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.reportProblemModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Melding doen')
        break
      case 'Contact':
        await waitFor(this.contactModuleButton).toBeVisible().withTimeout(2000)
        await this.contactModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Contact')
        break
      case 'Direct regelen':
        await waitFor(this.redirectsModuleButton)
          .toBeVisible()
          .withTimeout(2000)
        await this.redirectsModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Direct regelen')
        break
      case 'Over deze app':
        await waitFor(this.aboutModuleButton).toBeVisible().withTimeout(2000)
        await this.aboutModuleButton.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Over deze app')
        break
      default:
        assert.fail(`The entered section ‘${module}’ is an invalid module`)
    }
  }
}

export default new HomeScreen()
