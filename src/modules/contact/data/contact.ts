import {Key} from 'react'
import {TopTaskButtonProps} from '@/components/ui/buttons/TopTaskButton'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {type TestProps} from '@/components/ui/types'
import {RedirectKey} from '@/modules/redirects/types'
import {formatPhoneNumber} from '@/utils/formatPhoneNumber'

type ContactOption = {
  iconName: SvgIconName
  key: Key
  redirectsKey?: RedirectKey
  text: string
  title: string
  url?: string
} & Partial<
  Pick<TopTaskButtonProps, 'accessibilityHint' | 'accessibilityLabel'>
> &
  TestProps

export const contactOptions: ContactOption[] = [
  {
    accessibilityHint: 'Opent een link naar een formulier.',
    accessibilityLabel: 'Gebruik ons contactformulier',
    iconName: 'email',
    key: 'email',
    redirectsKey: RedirectKey.contactForm,
    testID: 'ContactContactFormButton',
    text: 'Reactie binnen 5 werkdagen',
    title: 'Contactformulier',
  },
  {
    accessibilityLabel: 'Bel veertien nul twintig',
    iconName: 'phone',
    key: 'phone',
    url: 'tel:14020',
    testID: 'ContactPhoneButton',
    text: 'Gemiddeld 5 minuten wachten',
    title: 'Bel 14 020',
  },
  {
    accessibilityLabel:
      'Whatsapp nul zes vierenveertig vierenveertig nul zes vijfenvijftig',
    iconName: 'whatsapp',
    key: 'whatsapp',
    url: 'https://wa.me/31644440655',
    testID: 'ContactWhatsAppButton',
    text: 'Reactie binnen 4 uur',
    title: `WhatsApp ${formatPhoneNumber('0644440655') ?? ''}`,
  },
  {
    accessibilityHint: 'Opent een link naar een website.',
    accessibilityLabel: 'Ga naar Mijn Amsterdam',
    iconName: 'person',
    key: 'mijn-amsterdam',
    url: 'https://mijn.amsterdam.nl/',
    testID: 'ContactMijnAmsterdamButton',
    text: 'Uw persoonlijke online pagina bij de gemeente Amsterdam.',
    title: 'Mijn Amsterdam',
  },
]
