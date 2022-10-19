import React, {Key} from 'react'
import {PressableProps} from 'react-native'
import {TopTaskButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column} from '@/components/ui/layout'
import {IconName} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {
  accessibleText,
  formatPhoneNumber,
  openPhoneUrl,
  openWebUrl,
} from '@/utils'

type ContactOption = {
  key: Key
  iconName: IconName
  text: string
  title: string
} & Partial<
  Pick<PressableProps, 'accessibilityLabel' | 'accessibilityRole' | 'onPress'>
>

const contactOptions: ContactOption[] = [
  {
    accessibilityRole: 'link',
    iconName: 'email',
    key: 'email',
    onPress: () =>
      openWebUrl(
        'https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx',
      ),
    text: 'Reactie binnen 1 werkdag',
    title: 'Contactformulier',
  },
  {
    accessibilityLabel: 'Bel veertien nul twintig',
    accessibilityRole: 'button',
    iconName: 'phone',
    key: 'phone',
    onPress: () => openPhoneUrl('+3114020'),
    text: 'Gemiddeld 5 minuten wachten',
    title: 'Bel 14 020',
  },
  {
    accessibilityLabel:
      'Whatsapp nul zes vierenveertig vierenveertig nul zes vijfenvijftig',
    accessibilityRole: 'button',
    iconName: 'whatsapp',
    key: 'whatsapp',
    onPress: () => openWebUrl('https://wa.me/31644440655'),
    text: 'Reactie binnen 2 uur',
    title: `WhatsApp ${formatPhoneNumber('0644440655') ?? ''}`,
  },
  {
    accessibilityLabel: 'Ga naar Mijn Amsterdam',
    accessibilityRole: 'link',
    iconName: 'person',
    key: 'mijn-amsterdam',
    onPress: () => openWebUrl('https://mijn.amsterdam.nl/'),
    text: 'Uw persoonlijke online pagina bij de gemeente Amsterdam.',
    title: 'Mijn Amsterdam',
  },
]

export const ContactOptions = () => (
  <Box>
    <Column gutter="lg">
      <Column gutter="sm">
        <Title text="Kunnen we u helpen?" />
        <Paragraph>
          Heeft u een vraag of wilt u iets weten? Neem op werkdagen contact met
          ons op.
        </Paragraph>
      </Column>
      <Column gutter="md">
        {contactOptions.map(props => (
          <TopTaskButton
            accessibilityLabel={accessibleText(
              props.accessibilityLabel ?? props.title,
              props.text,
            )}
            {...props}
          />
        ))}
      </Column>
    </Column>
  </Box>
)
