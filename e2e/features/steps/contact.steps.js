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
      await waitFor(HomeScreen.contactModuleButton)
        .toBeVisible()
        .withTimeout(10000)
    },
  )

  given(
    /ik ben op het homescherm - klik zodat welkomstscherm verdwijnt/,
    async () => {
      await WelcomeScreen.tapWelcomescreen()
      await expect(HomeScreen.contactModuleButton).toExist()
    },
  )

  when(/ik open de 'contact' module/, async () => {
    HomeScreen.tapModule('Contact')
  })

  then(/de contact module opent/, async () => {
    await waitFor(ContactScreen.headerTitle).toBeVisible().withTimeout(5000)
    await expect(ContactScreen.headerTitle).toHaveText('Contact')
  })

  given(/ik ben op het contactscherm/, async () => {
    await WelcomeScreen.tapWelcomeScreen()
    await HomeScreen.tapModule('Contact')
  })

  when(/ik verander het stadsloket naar stadsloket Nieuw-West/, async () => {
    await ContactScreen.visitUsTitle.swipe('up', 'fast', 0.5)
    await ContactScreen.currentCityOfficeButton.tap()
    await ContactScreen.tapCityOfficeButton('Nieuw-West')
  })

  then(
    /ik zie contactgegevens en informatie van het betreffende stadsloket/,
    async () => {
      await waitFor(ContactScreen.currentCityOfficeButton)
        .toBeVisible()
        .withTimeout(3000)
      // const attributes = await ContactScreen.ContactCurrentCityOfficeButton.getAttributes();
      // console.log(attributes);
      // await expect(ContactScreen.ContactCurrentCityOfficeButton).toHaveLabel('Stadsloket Nieuw-West Osdorpplein 946, 1068 TD, Amsterdam')
      // await expect(ContactScreen.ContactCurrentCityOfficeButton).toHaveLabel(
      //   'Tik om een ander stadsloket te selecteren.',
      // )
    },
  )

  then(/zie ik de volgende links:/, async () => {
    await expect(ContactScreen.contactFormButton).toExist
    await expect(ContactScreen.phoneButton).toExist
    await expect(ContactScreen.whatsAppButton).toExist
    await expect(ContactScreen.mijnAmsterdamButton).toExist
  })

  then(/zie ik de volgende titel en tekst/, async () => {
    await expect(ContactScreen.contactOptionsTitle).toHaveText(
      'Kunnen we u helpen?',
    )
    await expect(ContactScreen.contactOptionsIntroParagraph).toHaveText(
      'Heeft u een vraag of wilt u iets weten? Neem op werkdagen contact met ons op.',
    )
  })

  when(/ik klik op het stadsloket/, async () => {
    await ContactScreen.visitUsTitle.swipe('up', 'fast', 0.2)
    await ContactScreen.currentCityOfficeButton.tap()
  })

  then(/zie ik een lijst met stadsloketten/, async table => {
    await expect(ContactScreen.cityOfficeCentrumButton).toExist()
    await expect(ContactScreen.cityOfficeNieuwWestButton).toExist()
    await expect(ContactScreen.cityOfficeNoordButton).toExist()
    await expect(ContactScreen.cityOfficeOostButton).toExist()
    await expect(ContactScreen.cityOfficeWestButton).toExist()
    await expect(ContactScreen.cityOfficeZuidButton).toExist()
    await expect(ContactScreen.cityOfficeZuidoostButton).toExist()
    await expect(ContactScreen.cityOfficeWeespButton).toExist()
  })

  when(/^ik selecteer een stadsloket (.*)$/, async stadsloket => {
    await ContactScreen.tapCityOfficeButton(stadsloket)
    // await expect(ContactScreen.ContactCurrentCityOfficeButton).toHaveLabel(adres)
  })

  then(/^het juiste stadsloket wordt getoond (.*)$/, async titel => {
    // await expect(ContactScreen.ContactCurrentCityOfficeTitle).toExist()
    await expect(ContactScreen.currentCityOfficeTitle).toHaveText(titel)
  })

  and(/de bekijk routeknop wordt getoond/, async () => {
    await waitFor(ContactScreen.currentCityOfficeButton)
      .toBeVisible()
      .withTimeout(10000)
    await new Promise(r => setTimeout(r, 2000)) //explicit timeout, otherwise swipe functionality doesn't work
    await ContactScreen.currentCityOfficeButton.swipe('up')
    await expect(ContactScreen.seeRouteButton).toBeVisible()
  })

  when(/ik selecteer stadsloket Weesp/, async () => {
    await ContactScreen.visitUsTitle.swipe('up', 'fast', 0.2)
    await ContactScreen.currentCityOfficeButton.tap()
    await ContactScreen.cityOfficeWeespButton.tap()
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
      await expect(ContactScreen.makeAppointmentButton).toExist()
      await ContactScreen.currentCityOfficeButton.swipe('up', 'fast', 0.5)
      await expect(ContactScreen.seeRouteButton).toExist()
      await expect(ContactScreen.headerTitle).toBeVisible()
    },
  )
}

autoBindSteps(features, [contactSteps])
