import {Key} from 'react'
import {TopTaskButtonProps} from '@/components/ui/buttons/TopTaskButton'
import {IconName} from '@/components/ui/media/iconPaths'
import {OpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {OpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {formatPhoneNumber} from '@/utils/formatPhoneNumber'

type ContactOption = {
  iconName: IconName
  key: Key
  text: string
  title: string
} & Partial<
  Pick<
    TopTaskButtonProps,
    'accessibilityHint' | 'accessibilityLabel' | 'testID' | 'onPress'
  >
>

export const getContactOptions = (
  openPhoneUrl: OpenPhoneUrl,
  openWebUrl: OpenWebUrl,
  contactFormUrl?: string,
): ContactOption[] => [
  {
    accessibilityHint: 'Opent een link naar een formulier.',
    accessibilityLabel: 'Gebruik ons contactformulier',
    iconName: 'email',
    key: 'email',
    onPress: () => contactFormUrl && openWebUrl(contactFormUrl),
    testID: 'ContactContactFormButton',
    text: 'Reactie binnen 1 werkdag',
    title: 'Contactformulier',
  },
  {
    accessibilityLabel: 'Bel veertien nul twintig',
    iconName: 'phone',
    key: 'phone',
    onPress: () => openPhoneUrl('14020'),
    testID: 'ContactPhoneButton',
    text: 'Gemiddeld 5 minuten wachten',
    title: 'Bel 14 020',
  },
  {
    accessibilityLabel:
      'Whatsapp nul zes vierenveertig vierenveertig nul zes vijfenvijftig',
    iconName: 'whatsapp',
    key: 'whatsapp',
    onPress: () => openWebUrl('https://wa.me/31644440655'),
    testID: 'ContactWhatsAppButton',
    text: 'Reactie binnen 2 uur',
    title: `WhatsApp ${formatPhoneNumber('0644440655') ?? ''}`,
  },
  {
    accessibilityHint: 'Opent een link naar een website.',
    accessibilityLabel: 'Ga naar Mijn Amsterdam',
    iconName: 'person',
    key: 'mijn-amsterdam',
    onPress: () => openWebUrl('https://mijn.amsterdam.nl/'),
    testID: 'ContactMijnAmsterdamButton',
    text: 'Uw persoonlijke online pagina bij de gemeente Amsterdam.',
    title: 'Mijn Amsterdam',
  },
]
