import Afvalwijzer from '@/modules/onboarding/assets/images/screenshot-afvalwijzer.png'
import AmsterdamApp from '@/modules/onboarding/assets/images/screenshot-amsterdam-app.png'
import MeldingDoen from '@/modules/onboarding/assets/images/screenshot-melding-doen.png'
import Persoonlijk from '@/modules/onboarding/assets/images/screenshot-persoonlijk.png'
import Relevant from '@/modules/onboarding/assets/images/screenshot-relevant.png'
import Werkzaamheden from '@/modules/onboarding/assets/images/screenshot-werkzaamheden.png'
import {CarouselSlideItem} from '@/modules/onboarding/types'

export const onboardingData: CarouselSlideItem[] = [
  {
    title: 'Amsterdam App',
    description:
      'Snel en gemakkelijk informatie opzoeken, werkzaamheden bekijken en meldingen doen.',
    image: AmsterdamApp,
  },
  {
    title: 'Persoonlijk',
    description:
      'De hele stad bekijken of alleen uw adres? Bepaal het in de app.',
    image: Persoonlijk,
  },
  {
    title: 'Relevant',
    description: 'Kies zelf wat u in de app wilt zien.',
    image: Relevant,
  },
  {
    title: 'Afvalwijzer',
    description: 'Praktische informatie over afval altijd bij de hand.',
    image: Afvalwijzer,
  },
  {
    title: 'Werkzaamheden',
    description: 'Bekijk waar wij aan het werk zijn.',
    image: Werkzaamheden,
  },
  {
    title: 'Melding doen',
    description: 'Overlast? Iets kapot? Vertel het ons via de app.',
    image: MeldingDoen,
  },
]
