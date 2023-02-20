import {expect} from 'detox'
import {autoBindSteps, loadFeatures} from 'jest-cucumber'
import ContactScreen from '../screens/contact.screen'
import HomeScreen from '../screens/home.screen'
import WelcomeScreen from '../screens/welcome.screen'

const features = loadFeatures('e2e/features/contact.feature', {
  tagFilter: '@included and not @excluded',
})

const contactSteps = ({given, when, then, and}) => {
  beforeEach(async () => {
    await device.launchApp({newInstance: true})
  })

  given(
    /ik ben op het homescherm - wacht totdat welkomstscherm verdwijnt/,
    async () => {
      await waitFor(HomeScreen.HomeModuleButtonContact)
        .toBeVisible()
        .withTimeout(10000)
    },
  )

  given(
    /ik ben op het homescherm - klik zodat welkomstscherm verdwijnt/,
    async () => {
      await WelcomeScreen.tapWelcomescreen()
      await expect(HomeScreen.HomeModuleButtonContact).toExist()
    },
  )

  when(/ik open de 'contact' module/, async () => {
    await waitFor(HomeScreen.HomeModuleButtonContact)
      .toBeVisible()
      .withTimeout(10000)
    await HomeScreen.HomeModuleButtonContact.tap()
    await waitFor(ContactScreen.HeaderTitle).toBeVisible().withTimeout(5000)
  })

  then(/de contact module opent/, async () => {
    await waitFor(ContactScreen.HeaderTitle).toBeVisible().withTimeout(5000)
    await expect(ContactScreen.HeaderTitle).toHaveText('Contact')
  })

  given(/ik ben op het contactscherm/, async () => {
    await WelcomeScreen.tapWelcomeScreen()
    await HomeScreen.HomeModuleButtonContact.tap()
    await waitFor(ContactScreen.HeaderTitle).toBeVisible().withTimeout(5000)
  })

  when(/ik verander het stadsloket naar stadsloket Nieuw-West/, async () => {
    await ContactScreen.ContactTitleVisit.swipe('up', 'fast', 0.5)
    await ContactScreen.ContactButtonCurrentCityOffice.tap()
    await ContactScreen.clickStadsloket('Nieuw-West')
  })

  then(
    /ik zie contactgegevens en informatie van het betreffende stadsloket/,
    async () => {
      await waitFor(ContactScreen.ContactButtonCurrentCityOffice)
        .toBeVisible()
        .withTimeout(3000)
      // const attributes = await ContactScreen.ContactButtonCurrentCityOffice.getAttributes();
      // console.log(attributes);
      //await expect(ContactScreen.ContactButtonCurrentCityOffice).toHaveLabel('Stadsloket Nieuw-West Osdorpplein 946, 1068 TD, Amsterdam')
      // await expect(ContactScreen.ContactButtonCurrentCityOffice).toHaveLabel(
      //   'Tik om een ander stadsloket te selecteren.',
      // )
    },
  )

  then(/zie ik de volgende links:/, async () => {
    await expect(ContactScreen.ContactButtonContactform).toExist
    await expect(ContactScreen.ContactButtonPhone).toExist
    await expect(ContactScreen.ContactButtonWhatsapp).toExist
    await expect(ContactScreen.ContactButtonMyAmsterdam).toExist
  })

  then(/zie ik de volgende titel en tekst/, async () => {
    await expect(ContactScreen.ContactTitleContactOptions).toHaveText(
      'Kunnen we u helpen?',
    )
    await expect(ContactScreen.ContactTextContactOptions).toHaveText(
      'Heeft u een vraag of wilt u iets weten? Neem op werkdagen contact met ons op.',
    )
  })

  when(/ik klik op het stadsloket/, async () => {
    await ContactScreen.ContactTitleVisit.swipe('up', 'fast', 0.2)
    await ContactScreen.ContactButtonCurrentCityOffice.tap()
  })

  then(/zie ik een lijst met stadsloketten/, async table => {
    await expect(ContactScreen.ContactButtonCityOfficeCentrum).toExist()
    await expect(ContactScreen.ContactButtonCityOfficeNW).toExist()
    await expect(ContactScreen.ContactButtonCityOfficeNoord).toExist()
    await expect(ContactScreen.ContactButtonCityOfficeOost).toExist()
    await expect(ContactScreen.ContactButtonCityOfficeWest).toExist()
    await expect(ContactScreen.ContactButtonCityOfficeZuid).toExist()
    await expect(ContactScreen.ContactButtonCityOfficeZO).toExist()
    await expect(ContactScreen.ContactButtonCityOfficeWeesp).toExist()
  })

  when(/^ik selecteer een stadsloket (.*)$/, async stadsloket => {
    await ContactScreen.clickStadsloket(stadsloket)
    // await expect(ContactScreen.ContactButtonCurrentCityOffice).toHaveLabel(adres)
  })

  then(/^het juiste stadsloket wordt getoond (.*)$/, async titel => {
    //await expect(ContactScreen.ContactButtonCurrentCityOfficeTitle).toExist()
    await expect(ContactScreen.ContactButtonCurrentCityOfficeTitle).toHaveText(
      titel,
    )
  })

  and(/de bekijk routeknop wordt getoond/, async () => {
    await waitFor(ContactScreen.ContactButtonCurrentCityOffice)
      .toBeVisible()
      .withTimeout(10000)
    await new Promise(r => setTimeout(r, 2000)) //explicit timeout, otherwise swipe functionality doesn't work
    await ContactScreen.ContactButtonCurrentCityOffice.swipe('up')
    await expect(ContactScreen.ContactButtonRoute).toBeVisible()
  })

  when(/ik selecteer stadsloket Weesp/, async () => {
    await ContactScreen.ContactTitleVisit.swipe('up', 'fast', 0.2)
    await ContactScreen.ContactButtonCurrentCityOffice.tap()
    await ContactScreen.ContactButtonCityOfficeWeesp.tap()
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
      await expect(ContactScreen.ContactButtonMakeAppointment).toExist()
      await ContactScreen.ContactButtonCurrentCityOffice.swipe(
        'up',
        'fast',
        0.5,
      )
      await expect(ContactScreen.ContactButtonRoute).toExist()
      await expect(ContactScreen.HeaderTitle).toBeVisible()
    },
  )
}

autoBindSteps(features, [contactSteps])
