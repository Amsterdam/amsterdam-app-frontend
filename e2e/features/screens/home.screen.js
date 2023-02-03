import assert from 'chai'

class HomeScreen {
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
        await this.HomeModuleButtonWasteGuide.tap()
        break
      case 'Gft-container openen':
        await this.HomeModuleButtonOpenWasteContainer.tap()
        break
      case 'Werkzaamheden':
        await this.HomeModuleButtonConstructionWork.tap()
        break
      case 'Melding doen':
        await this.HomeModuleButtonReportProblem.tap()
        break
      case 'Contact':
        await this.HomeModuleButtonContact.tap()
        break
      case 'Direct regelen':
        await this.HomeModuleButtonRedirectsn.tap()
        break
      case 'Over deze app':
        await this.HomeModuleButtonAbout.tap()
        break
      default:
        assert.fail(`The entered section ${module} is an invalid module`)
    }
  }
}

export default new HomeScreen()
