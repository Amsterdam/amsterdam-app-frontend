import Afvalwijzer from '@/modules/onboarding/assets/images/screenshot-afvalwijzer.jpg'
import AmsterdamApp from '@/modules/onboarding/assets/images/screenshot-amsterdam-app.jpg'
import MeldingDoen from '@/modules/onboarding/assets/images/screenshot-melding-doen.jpg'
import Persoonlijk from '@/modules/onboarding/assets/images/screenshot-persoonlijk.jpg'
import Relevant from '@/modules/onboarding/assets/images/screenshot-relevant.jpg'
import Werkzaamheden from '@/modules/onboarding/assets/images/screenshot-werkzaamheden.jpg'
import {CarouselSlideItem} from '@/modules/onboarding/types'

export const onboardingData: CarouselSlideItem[] = [
  {
    title: 'Amsterdam App',
    description: 'Het startpunt voor een actieve relatie met de stad. ',
    image: AmsterdamApp,
  },
  {
    title: 'Persoonlijk',
    description: 'Informatie op basis van locatie of adres.',
    image: Persoonlijk,
  },
  {
    title: 'Relevant',
    description: 'Kies zelf wat u in de app wilt zien.',
    image: Relevant,
  },
  {
    title: 'Afvalwijzer',
    description: 'Praktische informatie over afval altijd bij de hand',
    image: Afvalwijzer,
  },
  {
    title: 'Werkzaamheden',
    description: 'Weet waar er aan de weg wordt gewerkt',
    image: Werkzaamheden,
  },
  {
    title: 'Melding doen',
    description:
      'Meld overlast, of wanneer er iets gemaakt of opgeruimd moet worden',
    image: MeldingDoen,
  },
]
