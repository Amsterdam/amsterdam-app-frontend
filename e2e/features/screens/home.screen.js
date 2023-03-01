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
  get HomeModuleButtonWasteGuide() {
    return element(by.id('HomeModuleButtonWasteGuide'))
  }

  get HomeModuleButtonOpenWasteContainer() {
    return element(by.id('HomeModuleButtonOpenWasteContainer'))
  }

  get HomeModuleButtonConstructionWork() {
    return element(by.id('HomeModuleButtonConstructionWork'))
  }

  get HomeModuleButtonReportProblem() {
    return element(by.id('HomeModuleButtonReportProblem'))
  }

  get HomeModuleButtonContact() {
    return element(by.id('HomeModuleButtonContact'))
  }

  get HomeModuleButtonRedirects() {
    return element(by.id('HomeModuleButtonRedirects'))
  }

  get HomeModuleButtonAbout() {
    return element(by.id('HomeModuleButtonAbout'))
  }

  async verifyHomeScreen() {
    await expect(this.gemeenteLogo).toBeVisible()
  }

  async tapModule(module) {
    switch (module) {
      case 'Afvalwijzer':
        await waitFor(this.HomeModuleButtonWasteGuide)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeModuleButtonWasteGuide.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Afvalwijzer')
        break
      case 'Gft-container openen':
        await waitFor(this.HomeModuleButtonOpenWasteContainer)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeModuleButtonOpenWasteContainer.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Gft-container openen')
        break
      case 'Werkzaamheden':
        await waitFor(this.HomeModuleButtonConstructionWork)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeModuleButtonConstructionWork.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Werkzaamheden')
        break
      case 'Melding doen':
        await waitFor(this.HomeModuleButtonReportProblem)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeModuleButtonReportProblem.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Melding doen')
        break
      case 'Contact':
        await waitFor(this.HomeModuleButtonContact)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeModuleButtonContact.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Contact')
        break
      case 'Direct regelen':
        await waitFor(this.HomeModuleButtonRedirects)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeModuleButtonRedirects.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Direct regelen')
        break
      case 'Over deze app':
        await waitFor(this.HomeModuleButtonAbout)
          .toBeVisible()
          .withTimeout(2000)
        await this.HomeModuleButtonAbout.tap()
        await waitFor(this.HeaderTitle).toBeVisible().withTimeout(2000)
        await expect(this.HeaderTitle).toHaveText('Over deze app')
        break
      default:
        assert.fail(`The entered section ${module} is an invalid module`)
    }
  }
}

export default new HomeScreen()
