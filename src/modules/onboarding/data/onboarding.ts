import Afvalwijzer from '@/modules/onboarding/assets/images/screenshot-afvalwijzer.png'
import Melding from '@/modules/onboarding/assets/images/screenshot-melding.png'
import Persoonlijk from '@/modules/onboarding/assets/images/screenshot-persoonlijk.png'
import Relevant from '@/modules/onboarding/assets/images/screenshot-relevant.png'
import Stadspas from '@/modules/onboarding/assets/images/screenshot-stadspas.png'
import Startscherm from '@/modules/onboarding/assets/images/screenshot-startscherm.png'
import Werkzaamheden from '@/modules/onboarding/assets/images/screenshot-werkzaamheden.png'
import {CarouselSlideItem} from '@/modules/onboarding/types'

export const onboardingData: CarouselSlideItem[] = [
  {
    title: 'Amsterdam App',
    description: 'Informatie en diensten binnen handbereik.',
    image: Startscherm,
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
    image: Melding,
  },
  {
    title: 'Stadspas',
    description: 'Uw Stadspas altijd mee en inzicht in uw saldo.',
    image: Stadspas,
  },
]
