import Afvalwijzer from '@/modules/onboarding/assets/images/screenshot-afvalwijzer.jpg'
import AmsterdamApp from '@/modules/onboarding/assets/images/screenshot-amsterdam-app.jpg'
import MeldingDoen from '@/modules/onboarding/assets/images/screenshot-melding-doen.jpg'
import Persoonlijk from '@/modules/onboarding/assets/images/screenshot-persoonlijk.jpg'
import Relevant from '@/modules/onboarding/assets/images/screenshot-relevant.jpg'
import Werkzaamheden from '@/modules/onboarding/assets/images/screenshot-werkzaamheden.jpg'
import {CarouselSlideItemType} from '@/modules/onboarding/types'

export const onboardingData: CarouselSlideItemType[] = [
  {
    title: 'Amsterdam App',
    subText: 'Het startpunt voor een actieve relatie met de stad. ',
    image: AmsterdamApp,
  },
  {
    title: 'Persoonlijk',
    subText: 'Informatie op basis van locatie of adres.',
    image: Persoonlijk,
  },
  {
    title: 'Relevant',
    subText: 'Kies zelf wat u in de app wilt zien.',
    image: Relevant,
  },
  {
    title: 'Afvalwijzer',
    subText: 'Praktische informatie over afval altijd bij de hand',
    image: Afvalwijzer,
  },
  {
    title: 'Werkzaamheden',
    subText: 'Weet waar er aan de weg wordt gewerkt',
    image: Werkzaamheden,
  },
  {
    title: 'Melding doen',
    subText:
      'Meld overlast, of wanneer er iets gemaakt of opgeruimd moet worden',
    image: MeldingDoen,
  },
]
