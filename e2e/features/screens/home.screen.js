import assert from 'chai'

class HomeScreen {
  get afvalWijzerModule() {
    return element(by.text('Afvalwijzer'))
  }

  get gftContainerOpenen() {
    return element(by.text('Gft-container openen'))
  }

  get werkzaamhedenModule() {
    return element(by.text('Werkzaamheden'))
  }

  get meldingDoenModule() {
    return element(by.text('Melding doen'))
  }

  get contactModule() {
    return element(by.text('Contact'))
  }

  get directRegelenModule() {
    return element(by.text('Direct regelen'))
  }

  get overDezeAppModule() {
    return element(by.text('Over deze app'))
  }

  async verifyHomeScreen() {
    await expect(this.gemeenteLogo).toBeVisible()
  }

  async tapModule(module) {
    switch (module) {
      case 'Afvalwijzer':
        await this.afvalWijzerModule.tap()
        break
      case 'Gft-container openen':
        await this.gftContainerOpenen.tap()
        break
      case 'Werkzaamheden':
        await this.werkzaamhedenModule.tap()
        break
      case 'Melding doen':
        await this.meldingDoenModule.tap()
        break
      case 'Contact':
        await this.contactModule.tap()
        break
      case 'Direct regelen':
        await this.animationSection.tap()
        break
      case 'Over deze app':
        await this.overDezeAppModule.tap()
        break
      default:
        assert.fail(`The entered section ${module} is an invaltext module`)
    }
  }
}

export default new HomeScreen()
