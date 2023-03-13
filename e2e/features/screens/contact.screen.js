import {assert} from 'chai'
import Screen from './screen'

class ContactScreen extends Screen {
  get contactOptionsTitle() {
    return element(by.id('ContactContactOptionsTitle'))
  }

  get contactOptionsIntroParagraph() {
    return element(by.id('ContactContactOptionsText'))
  }

  get contactFormButton() {
    return element(by.id('ContactContactFormButton'))
  }

  get phoneButton() {
    return element(by.id('ContactPhoneButton'))
  }

  get whatsAppButton() {
    return element(by.id('ContactWhatsAppButton'))
  }

  get mijnAmsterdamButton() {
    return element(by.id('ContactMijnAmsterdamButton'))
  }

  get visitUsTitle() {
    return element(by.id('ContactVisitUsTitle'))
  }

  get currentCityOfficeButton() {
    return element(by.id('ContactCurrentCityOfficeButton'))
  }

  get currentCityOfficeTitle() {
    return element(by.id('ContactCurrentCityOfficeTitle'))
  }

  get visitingHoursParagraph() {
    return element(by.id('ContactVisitingHoursParagraph'))
  }

  get visitingHoursTooltipButton() {
    return element(by.id('ContactVisitingHoursTooltipButton'))
  }

  get seeRouteButton() {
    return element(by.id('ContactSeeRouteButton'))
  }

  get makeAppointmentParagraph() {
    return element(by.id('ContactMakeAppointmentParagraph'))
  }

  get makeAppointmentButton() {
    return element(by.id('ContactMakeAppointmentButton'))
  }

  get cityOfficeCentrumButton() {
    return element(
      by.id('ContactCityOfficee9871a7716da02a4c20cfb06f9547005Button'),
    )
  }

  get cityOfficeNieuwWestButton() {
    return element(
      by.id('ContactCityOffice5d9637689a8b902fa1a13acdf0006d26Button'),
    )
  }

  get cityOfficeNoordButton() {
    return element(
      by.id('ContactCityOffice081d6a38f46686905693fcd6087039f5Button'),
    )
  }

  get cityOfficeOostButton() {
    return element(
      by.id('ContactCityOffice29e3b63d09d1f0c9a9c7238064c70790Button'),
    )
  }

  get cityOfficeWestButton() {
    return element(
      by.id('ContactCityOfficeb4b178107cbc0c609d8d190bbdbdfb08Button'),
    )
  }

  get cityOfficeZuidButton() {
    return element(
      by.id('ContactCityOfficeb887a4d081821c4245c02f07e2de3290Button'),
    )
  }

  get cityOfficeZuidoostButton() {
    return element(
      by.id('ContactCityOfficed338d28f8e6132ea2cfcf3e61785454cButton'),
    )
  }

  get cityOfficeWeespButton() {
    return element(
      by.id('ContactCityOffice5ae1d0dd98a417fbf6772aeec85cb40fButton'),
    )
  }

  async checkCityOfficesList(title) {
    switch (title) {
      case 'Centrum':
        await expect(this.cityOfficeCentrumButton).toExist()
        break
      case 'Nieuw-West':
        await expect(this.cityOfficeNieuwWestButton).toExist()
        break
      case 'Noord':
        await expect(this.cityOfficeNoordButton).toExist()
        break
      case 'Oost':
        await expect(this.cityOfficeOostButton).toExist()
        break
      case 'West':
        await expect(this.cityOfficeWestButton).toExist()
        break
      case 'Zuid':
        await expect(this.cityOfficeZuidButton).toExist()
        break
      case 'Zuidoost':
        await expect(this.cityOfficeZuidoostButton).toExist()
        break
      case 'Weesp':
        await expect(this.cityOfficeWeespButton).toExist()
        break
      default:
        assert.fail(`Invalid city office title ‘${title}’`)
    }
  }

  async tapCityOfficeButton(title) {
    switch (title) {
      case 'Centrum':
        await this.cityOfficeCentrumButton.tap()
        break
      case 'Nieuw-West':
        await this.cityOfficeNieuwWestButton.tap()
        break
      case 'Noord':
        await this.cityOfficeNoordButton.tap()
        break
      case 'Oost':
        await this.cityOfficeOostButton.tap()
        break
      case 'West':
        await this.cityOfficeWestButton.tap()
        break
      case 'Zuid':
        await this.cityOfficeZuidButton.tap()
        break
      case 'Zuidoost':
        await this.cityOfficeZuidoostButton.tap()
        break
      case 'Weesp':
        await this.cityOfficeWeespButton.tap()
        break
      default:
        assert.fail(`Invalid city office title ‘${title}’`)
    }
  }
}

export default new ContactScreen()
