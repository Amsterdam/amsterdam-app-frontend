import {ImageURISource} from 'react-native'

export const onboardingData = [
  {
    title: 'Amsterdam App',
    subText: 'Het startpunt voor een actieve relatie met de stad. ',
    image:
      require('@/modules/welcome/assets/images/screenshot-amsterdam-app.jpg') as ImageURISource,
  },
  {
    title: 'Afvalwijzer',
    subText: 'Praktische informatie over afval altijd bij de hand',
    image:
      require('@/modules/welcome/assets/images/screenshot-afvalwijzer.jpg') as ImageURISource,
  },
  {
    title: 'Werkzaamheden',
    subText: 'Weet waar er aan de weg wordt gewerkt',
    image:
      require('@/modules/welcome/assets/images/screenshot-werkzaamheden.jpg') as ImageURISource,
  },
  {
    title: 'Melding doen',
    subText:
      'Meld overlast, of wanneer er iets gemaakt of opgeruimd moet worden',
    image:
      require('@/modules/welcome/assets/images/screenshot-melding-doen.jpg') as ImageURISource,
  },
  {
    title: 'Persoonlijk',
    subText: 'Informatie op basis van locatie of adres.',
    image:
      require('@/modules/welcome/assets/images/screenshot-persoonlijk.jpg') as ImageURISource,
  },
]
