import {loadFeatures, autoBindSteps} from 'jest-cucumber'
import contactPage from '../pageobjects/contact.page'
import homePage from '../pageobjects/home.page'
import {expect} from 'detox'

const features = loadFeatures('e2e/features/contact.feature')

const contactSteps = ({given, when, then, and}) => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true})
  })

  given(/ik ben op de homepagina/, async () => {
    await waitFor(homePage.contactModule).toBeVisible().withTimeout(10000)
  })

  when(/ik open de 'contact' module/, async () => {
    await waitFor(homePage.contactModule).toBeVisible().withTimeout(10000)
    await homePage.contactModule.tap()
    await waitFor(contactPage.HeaderTitle).toBeVisible().withTimeout(5000)
  })

  then(/de contact pagina opent/, async () => {
    await waitFor(contactPage.HeaderTitle).toBeVisible().withTimeout(5000)
    await expect(contactPage.HeaderTitle).toHaveText('Contact')
  })

  given(/ik ben op de contactpagina/, async () => {
    await waitFor(homePage.contactModule).toBeVisible().withTimeout(10000)
    await homePage.contactModule.tap()
    await waitFor(contactPage.HeaderTitle).toBeVisible().withTimeout(5000)
  })

  when(/ik verander het stadsloket naar stadsloket Nieuw-West/, async () => {
    await contactPage.ContactTitleVisit.swipe('up', 'fast', 0.5)
    await contactPage.ContactButtonCurrentCityOffice.tap()
    await contactPage.clickStadsloket('Nieuw-West')
  })

  then(
    /ik zie contactgegevens en informatie van het betreffende stadsloket/,
    async () => {
      await waitFor(contactPage.ContactButtonCurrentCityOffice)
        .toBeVisible()
        .withTimeout(3000)
      // const attributes = await contactPage.ContactButtonCurrentCityOffice.getAttributes();
      // console.log(attributes);
      //await expect(contactPage.ContactButtonCurrentCityOffice).toHaveLabel('Stadsloket Nieuw-West Osdorpplein 946, 1068 TD, Amsterdam')
      // await expect(contactPage.ContactButtonCurrentCityOffice).toHaveLabel(
      //   'Tik om een ander stadsloket te selecteren.',
      // )
    },
  )

  then(/zie ik de volgende links:/, async () => {
    await expect(contactPage.ContactButtonContactform).toExist
    await expect(contactPage.ContactButtonPhone).toExist
    await expect(contactPage.ContactButtonWhatsapp).toExist
    await expect(contactPage.ContactButtonMyAmsterdam).toExist
  })

  then(/zie ik de volgende titel en tekst/, async () => {
    await expect(contactPage.ContactTitleContactOptions).toHaveText(
      'Kunnen we u helpen?',
    )
    await expect(contactPage.ContactTextContactOptions).toHaveText(
      'Heeft u een vraag of wilt u iets weten? Neem op werkdagen contact met ons op.',
    )
  })

  when(/ik klik op het stadsloket/, async t => {
    await contactPage.ContactTitleVisit.swipe('up', 'fast', 0.2)
    await contactPage.ContactButtonCurrentCityOffice.tap()
  })

  then(/zie ik een lijst met stadsloketten/, async table => {
    // const stadsloketArr = table;
    // stadsloketArr.forEach((element => contactPage.checkStadsloketList(element.stadsloket)))
    await expect(contactPage.ContactButtonCityOfficeCentrum).toExist()
    await expect(contactPage.ContactButtonCityOfficeNW).toExist()
    await expect(contactPage.ContactButtonCityOfficeNoord).toExist()
    await expect(contactPage.ContactButtonCityOfficeOost).toExist()
    await expect(contactPage.ContactButtonCityOfficeWest).toExist()
    await expect(contactPage.ContactButtonCityOfficeZuid).toExist()
    await expect(contactPage.ContactButtonCityOfficeZO).toExist()
    await expect(contactPage.ContactButtonCityOfficeWeesp).toExist()
  })

  when(/ik selecteer stadsloket Weesp/, async () => {
    await contactPage.ContactTitleVisit.swipe('up', 'fast', 0.2)
    await contactPage.ContactButtonCurrentCityOffice.tap()
    await contactPage.ContactButtonCityOfficeWeesp.tap()
  })

  then(/ik zie een adres van het stadsloket/, async () => {
    await expect(element(by.label('Nieuwstraat 70a, 1380 BD, Weesp'))).toExist()
  })

  and(
    /ik zie openingstijden, Bekijk routeknop en Maak een afspraakknop/,
    async () => {
      await expect(
        element(by.label('Openingstijden Sociaal loket, altijd met afspraak:')),
      ).toExist()
      await expect(
        element(by.label('Openingstijden Sociaal loket, altijd met afspraak:')),
      ).toExist()
      await expect(
        element(
          by.text('maandag, dinsdag, donderdag en vrijdag 8.30-11.00 uur'),
        ),
      ).toExist()
      await expect(
        element(
          by.text(
            'woensdag op Papelaan 99 (als onderdeel van Weesper MOP) 9.30-11.30 uur.',
          ),
        ),
      ).toExist()
      await expect(contactPage.ContactButtonMakeAppointment).toExist()
      //await expect(element(by.id('ContactButtonMakeAppointment'))).toHaveLabel('Opent een link naar een formulier.')
      //await element(by.id('ContactButtonMakeAppointment')).swipe('up')
      await contactPage.ContactButtonCurrentCityOffice.swipe('up', 'fast', 0.5)
      // await contactPage.ContactButtonMakeAppointment.tap()
      // await device.launchApp({newInstance: false});
      await expect(contactPage.ContactButtonRoute).toExist()
      // await contactPage.ContactButtonRoute.tap()
      // await device.launchApp({newInstance: false});
      await expect(contactPage.HeaderTitle).toBeVisible()
    },
  )
}

autoBindSteps(features, [contactSteps])