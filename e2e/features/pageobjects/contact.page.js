import {assert} from 'chai'
const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ContactPage extends Page {
  /**
   * define selectors using getter methods
   */

  get ContactTitleContactOptions() {
    return element(by.id('ContactTitleContactOptions'))
  }

  get ContactTextContactOptions() {
    return element(by.id('ContactTextContactOptions'))
  }

  get ContactButtonContactform() {
    return element(by.id('ContactButtonContactform'))
  }

  get ContactButtonPhone() {
    return element(by.id('ContactButtonPhone'))
  }

  get ContactButtonWhatsapp() {
    return element(by.id('ContactButtonWhatsapp'))
  }

  get ContactButtonMyAmsterdam() {
    return element(by.id('ContactButtonMyAmsterdam'))
  }

  get ContactTitleVisit() {
    return element(by.id('ContactTitleVisit'))
  }

  get ContactButtonCurrentCityOffice() {
    return element(by.id('ContactButtonCurrentCityOffice'))
  }

  get ContactTextVisitingHours() {
    return element(by.id('ContactTextVisitingHours'))
  }

  get ContactButtonVisitingHoursDetails() {
    return element(by.id('ContactButtonVisitingHoursDetails'))
  }

  get ContactButtonRoute() {
    return element(by.id('ContactButtonRoute'))
  }

  get ContactTextAppointment() {
    return element(by.id('ContactTextAppointment'))
  }

  get ContactButtonMakeAppointment() {
    return element(by.id('ContactButtonMakeAppointment'))
  }

  get ContactButtonCityOfficeCentrum() {
    return element(
      by.id('ContactButtonCityOfficee9871a7716da02a4c20cfb06f9547005'),
    )
  }

  get ContactButtonCityOfficeNW() {
    return element(
      by.id('ContactButtonCityOffice5d9637689a8b902fa1a13acdf0006d26'),
    )
  }

  get ContactButtonCityOfficeNoord() {
    return element(
      by.id('ContactButtonCityOffice081d6a38f46686905693fcd6087039f5'),
    )
  }

  get ContactButtonCityOfficeOost() {
    return element(
      by.id('ContactButtonCityOffice29e3b63d09d1f0c9a9c7238064c70790'),
    )
  }

  get ContactButtonCityOfficeWest() {
    return element(
      by.id('ContactButtonCityOfficeb4b178107cbc0c609d8d190bbdbdfb08'),
    )
  }

  get ContactButtonCityOfficeZuid() {
    return element(
      by.id('ContactButtonCityOfficeb887a4d081821c4245c02f07e2de3290'),
    )
  }

  get ContactButtonCityOfficeZO() {
    return element(
      by.id('ContactButtonCityOfficed338d28f8e6132ea2cfcf3e61785454c'),
    )
  }

  get ContactButtonCityOfficeWeesp() {
    return element(
      by.id('ContactButtonCityOffice5ae1d0dd98a417fbf6772aeec85cb40f'),
    )
  }

  async checkStadsloketList(stadsloket) {
    switch (stadsloket) {
      case 'Centrum':
        await expect(this.ContactButtonCityOfficeCentrum).toExist()
        break
      case 'Nieuw-West':
        await expect(this.ContactButtonCityOfficeNW).toExist()
        break
      case 'Noord':
        await expect(this.ContactButtonCityOfficeNoord).toExist()
        break
      case 'Oost':
        await expect(this.ContactButtonCityOfficeOost).toExist()
        break
      case 'West':
        await expect(this.ContactButtonCityOfficeWest).toExist()
        break
      case 'Zuid':
        await expect(this.ContactButtonCityOfficeZuid).toExist()
        break
      case 'ZuidOost':
        await expect(this.ContactButtonCityOfficeZO).toExist()
        break
      case 'Weesp':
        await expect(this.ContactButtonCityOfficeWeesp).toExist()
        break
      default:
        assert.fail(`${stadsloket} is an invalid value`)
    }
  }

  async clickStadsloket(stadsloket) {
    switch (stadsloket) {
      case 'Centrum':
        await this.ContactButtonCityOfficeCentrum.tap()
        break
      case 'Nieuw-West':
        await this.ContactButtonCityOfficeNW.tap()
        break
      case 'Noord':
        await this.ContactButtonCityOfficeNoord.tap()
        break
      case 'Oost':
        await this.ContactButtonCityOfficeOost.tap()
        break
      case 'West':
        await this.ContactButtonCityOfficeWest.tap()
        break
      case 'Zuid':
        await this.ContactButtonCityOfficeZuid.tap()
        break
      case 'ZuidOost':
        await this.ContactButtonCityOfficeZO.tap()
        break
      case 'Weesp':
        await this.ContactButtonCityOfficeWeesp.tap()
        break
      default:
        assert.fail(`${stadsloket} is an invalid value`)
    }
  }
}

module.exports = new ContactPage()
