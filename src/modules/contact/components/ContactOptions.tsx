import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Key, ReactNode} from 'react'
import {PressableProps} from 'react-native'
import {PersonalLogin, Whatsapp} from '@/assets/icons'
import {Box} from '@/components/ui'
import {Pressable} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {ContactOption} from '@/modules/contact/components'
import {ContactRouteName, ContactStackParams} from '@/modules/contact/routes'
import {useTheme} from '@/themes'
import {accessibleText, openPhoneUrl} from '@/utils'
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
  const {color} = useTheme()
  const iconColor = color.pressable.default.background

  const navigation =
    useNavigation<
      StackNavigationProp<ContactStackParams, ContactRouteName.contact>
    >()

  const contactOptions: ContactOptionType[] = [
    {
      buttonProps: {
        accessibilityRole: 'button',
        key: 'email',
        onPress: () => navigation.navigate(ContactRouteName.contactForm),
      },
      contactProps: {
        icon: <Email fill={iconColor} />,
        text: 'Reactie binnen 1 werkdag',
        title: 'Contactformulier',
      },
    },
    {
      buttonProps: {
        accessibilityRole: 'link',
        key: 'phone',
        onPress: () => openPhoneUrl('+3114020'),
      },
      contactProps: {
        accessibilityTitle: 'Bel veertien nul twintig',
        icon: <Phone fill={iconColor} />,
        text: 'Gemiddeld 5 minuten wachten',
        title: 'Bel 14 020',
      },
    },
    {
      buttonProps: {
        accessibilityRole: 'link',
        key: 'whatsapp',
        onPress: () => openWebUrl('https://wa.me/31644440655'),
      },
      contactProps: {
        accessibilityTitle:
          'Whatsapp nul zes vierenveertig vierenveertig nul zes vijfenvijftig',
        icon: <Whatsapp fill={iconColor} />,
        text: 'Reactie binnen 2 uur',
        title: 'WhatsApp 06 44 44 06 55',
      },
    },
    {
      buttonProps: {
        accessibilityRole: 'link',
        key: 'mijn-amsterdam',
        onPress: () =>
          openWebUrl(
            'https://mijn.amsterdam.nl/?pk_vid=1b2e97fe97357d351658843171e6a58f',
          ),
      },
      contactProps: {
        accessibilityTitle: 'Ga naar mijn amsterdam',
        icon: <PersonalLogin fill={iconColor} />,
        text: 'Uw persoonlijke online pagina bij de gemeente Amsterdam.',
        title: 'Mijn Amsterdam',
      },
    },
  ]

  return (
    <Box>
      <Column gutter="lg">
        <Column>
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
