import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import React, {Key, ReactNode, SVGProps} from 'react'
import {PressableProps} from 'react-native'
import {PersonalLogin, Whatsapp} from '@/assets/icons'
import {Box} from '@/components/ui'
import {IconWithTitleButton} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'
import {
  accessibleText,
  formatPhoneNumber,
  openPhoneUrl,
  openWebUrl,
} from '@/utils'

type ContactOption = {
  key: Key
  icon: ReactNode
  text: string
  title: string
} & Partial<
  Pick<PressableProps, 'accessibilityLabel' | 'accessibilityRole' | 'onPress'>
>

const createContactOptions = (
  iconProps: SVGProps<unknown>,
): ContactOption[] => [
  {
    accessibilityRole: 'link',
    icon: <Email {...iconProps} />,
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
    icon: <Phone {...iconProps} />,
    key: 'phone',
    onPress: () => openPhoneUrl('+3114020'),
    text: 'Gemiddeld 5 minuten wachten',
    title: 'Bel 14 020',
  },
  {
    accessibilityLabel:
      'Whatsapp nul zes vierenveertig vierenveertig nul zes vijfenvijftig',
    accessibilityRole: 'button',
    icon: <Whatsapp {...iconProps} />,
    key: 'whatsapp',
    onPress: () => openWebUrl('https://wa.me/31644440655'),
    text: 'Reactie binnen 2 uur',
    title: `WhatsApp ${formatPhoneNumber('0644440655') ?? ''}`,
  },
  {
    accessibilityLabel: 'Ga naar Mijn Amsterdam',
    accessibilityRole: 'link',
    icon: <PersonalLogin {...iconProps} />,
    key: 'mijn-amsterdam',
    onPress: () => openWebUrl('https://mijn.amsterdam.nl/'),
    text: 'Uw persoonlijke online pagina bij de gemeente Amsterdam.',
    title: 'Mijn Amsterdam',
  },
]

export const ContactOptions = () => {
  const iconProps = useThemable(createIconProps)
  const contactOptions = createContactOptions(iconProps)

  return (
    <Box>
      <Column gutter="md">
        <Column gutter="sm">
          <Title text="Kunnen we u helpen?" />
          <Paragraph>
            Heeft u een vraag of wilt u iets weten? Neem contact met ons op.
          </Paragraph>
        </Column>
        <Column gutter="sm">
          {contactOptions.map(props => (
            <IconWithTitleButton
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
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
