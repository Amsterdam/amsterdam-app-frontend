import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Facebook from '@amsterdam/asc-assets/static/icons/Facebook.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import Twitter from '@amsterdam/asc-assets/static/icons/Twitter.svg'
import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Key, ReactNode} from 'react'
import {TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {Instagram, Whatsapp} from '@/assets/icons'
import {Box, Title} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {ContactOption} from '@/modules/contact/components'
import {ContactRouteName, ContactStackParams} from '@/modules/contact/routes'
import {useTheme} from '@/themes'
import {accessibleText, openPhoneUrl} from '@/utils'
import {openWebUrl} from '@/utils/openWebUrl'

type ContactOptionType = {
  buttonProps: TouchableOpacityProps & {key: Key}
  contactProps: {
    accessibilityTitle?: string
    icon: ReactNode
    text: string
    title: string
  }
}

export const ContactOptions = () => {
  const {color} = useTheme()

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
        icon: <Email fill={color.pressable.default.background} />,
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
        icon: <Phone fill={color.pressable.default.background} />,
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
        icon: <Whatsapp fill={color.pressable.default.background} />,
        text: 'Reactie binnen 2 uur',
        title: 'WhatsApp 06 44 44 06 55',
      },
    },
  ]

  return (
    <Box>
      <Title level={2} text="Neem contact op" />
      <Gutter height="md" />
      <Column gutter="sm">
        {contactOptions.map(({buttonProps, contactProps}) => (
          <TouchableOpacity
            accessibilityLabel={accessibleText(
              contactProps.accessibilityTitle ?? contactProps.title,
              contactProps.text,
            )}
            {...buttonProps}>
            <ContactOption {...contactProps} />
          </TouchableOpacity>
        ))}
      </Column>
      <Gutter height="lg" />
      <Title
        level={4}
        text="U kunt ook contact opnemen via één van onze social kanalen"
      />
      <Gutter height="md" />
      <Row gutter="lg">
        <IconButton
          accessibilityLabel="Facebook"
          accessibilityRole="link"
          icon={
            <Icon size={32}>
              <Facebook fill={color.pressable.default.background} />
            </Icon>
          }
          onPress={() =>
            openWebUrl('https://www.facebook.com/gemeenteamsterdam')
          }
        />
        <IconButton
          accessibilityLabel="Twitter"
          accessibilityRole="link"
          icon={
            <Icon size={32}>
              <Twitter fill={color.pressable.default.background} />
            </Icon>
          }
          onPress={() => openWebUrl('https://twitter.com/AmsterdamNL')}
        />
        <IconButton
          accessibilityLabel="Instagram"
          accessibilityRole="link"
          icon={
            <Icon size={32}>
              <Instagram fill={color.pressable.default.background} />
            </Icon>
          }
          onPress={() =>
            openWebUrl('https://www.instagram.com/gemeenteamsterdam/')
          }
        />
      </Row>
      <Gutter height="xl" />
    </Box>
  )
}