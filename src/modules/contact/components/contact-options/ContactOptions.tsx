import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import React, {Key, ReactNode, SVGProps} from 'react'
import {PressableProps} from 'react-native'
import {PersonalLogin, Whatsapp} from '@/assets/icons'
import {Box} from '@/components/ui'
import {Pressable} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {ContactOption} from '@/modules/contact/components'
import {Theme, useThemable} from '@/themes'
import {accessibleText, formatPhoneNumber, openPhoneUrl} from '@/utils'
import {openWebUrl} from '@/utils/openWebUrl'

type ContactOptionType = {
  buttonProps: PressableProps & {key: Key}
  contactProps: {
    accessibilityTitle?: string
    icon: ReactNode
    text: string
    title: string
  }
}

export const ContactOptions = () => {
  const iconProps = useThemable(createIconProps)

  const contactOptions: ContactOptionType[] = [
    {
      buttonProps: {
        accessibilityRole: 'link',
        key: 'email',
        onPress: () =>
          openWebUrl(
            'https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx',
          ),
      },
      contactProps: {
        icon: <Email {...iconProps} />,
        text: 'Reactie binnen 1 werkdag',
        title: 'Contactformulier',
      },
    },
    {
      buttonProps: {
        accessibilityRole: 'button',
        key: 'phone',
        onPress: () => openPhoneUrl('+3114020'),
      },
      contactProps: {
        accessibilityTitle: 'Bel veertien nul twintig',
        icon: <Phone {...iconProps} />,
        text: 'Gemiddeld 5 minuten wachten',
        title: 'Bel 14 020',
      },
    },
    {
      buttonProps: {
        accessibilityRole: 'button',
        key: 'whatsapp',
        onPress: () => openWebUrl('https://wa.me/31644440655'),
      },
      contactProps: {
        accessibilityTitle:
          'Whatsapp nul zes vierenveertig vierenveertig nul zes vijfenvijftig',
        icon: <Whatsapp {...iconProps} />,
        text: 'Reactie binnen 2 uur',
        title: `WhatsApp ${formatPhoneNumber('0644440655') ?? ''}`,
      },
    },
    {
      buttonProps: {
        accessibilityRole: 'link',
        key: 'mijn-amsterdam',
        onPress: () => openWebUrl('https://mijn.amsterdam.nl/'),
      },
      contactProps: {
        accessibilityTitle: 'Ga naar Mijn Amsterdam',
        icon: <PersonalLogin {...iconProps} />,
        text: 'Uw persoonlijke online pagina bij de gemeente Amsterdam.',
        title: 'Mijn Amsterdam',
      },
    },
  ]

  return (
    <Box>
      <Column gutter="lg">
        <Column gutter="sm">
          <Title text="Kunnen we u helpen?" />
          <Paragraph>
            Heeft u een vraag of wilt u iets weten? Neem contact met ons op.
          </Paragraph>
        </Column>
        <Column gutter="sm">
          {contactOptions.map(({buttonProps, contactProps}) => (
            <Pressable
              accessibilityLabel={accessibleText(
                contactProps.accessibilityTitle ?? contactProps.title,
                contactProps.text,
              )}
              {...buttonProps}>
              <ContactOption {...contactProps} />
            </Pressable>
          ))}
        </Column>
      </Column>
    </Box>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.pressable.default.background,
})
