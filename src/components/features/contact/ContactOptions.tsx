import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Facebook from '@amsterdam/asc-assets/static/icons/Facebook.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import Twitter from '@amsterdam/asc-assets/static/icons/Twitter.svg'
import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Key, ReactNode} from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {Instagram, Whatsapp} from '../../../assets/icons'
import {color} from '../../../tokens'
import {accessibleText, openPhoneUrl} from '../../../utils'
import {openWebUrl} from '../../../utils/openWebUrl'
import {Box, Title} from '../../ui'
import {Column, Gutter, Row} from '../../ui/layout'
import {ContactOption} from './ContactOption'

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
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Contact'>>()

  const contactOptions: ContactOptionType[] = [
    {
      buttonProps: {
        accessibilityRole: 'button',
        key: 'email',
        onPress: () =>
          navigation.navigate(routes.webView.name, {
            sliceFromTop: {portrait: 50, landscape: 50},
            title: 'Neem contact op',
            url: 'https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx',
          }),
      },
      contactProps: {
        accessibilityTitle:
          'Whatsapp nul zes vierenveertig vierenveertig nul zes vijfenvijftig',
        icon: <Email fill={color.touchable.primary} />,
        text: 'Reactie binnen twee uur',
        title: 'WhatsApp 06 44 44 06 55',
      },
    },
    {
      buttonProps: {
        accessibilityRole: 'link',
        key: 'phone',
        onPress: () => openPhoneUrl('+3114020'),
      },
      contactProps: {
        icon: <Phone fill={color.touchable.primary} />,
        text: 'Reactie binnen 1 werkdag',
        title: 'Contactformulier',
      },
    },
    {
      buttonProps: {
        accessibilityRole: 'link',
        key: 'whatsapp',
        onPress: () => openWebUrl('https://wa.me/31644440655'),
      },
      contactProps: {
        accessibilityTitle: 'Bel veertien nul twintig',
        icon: <Whatsapp fill={color.touchable.primary} />,
        text: 'Gemiddeld 5 minuten wachten',
        title: 'Bel 14 020',
      },
    },
  ]

  return (
    <Box background="white">
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
        text="U kunt ook contact opnemen via ????n van onze social kanalen"
      />
      <Gutter height="md" />
      <Row gutter="lg">
        <TouchableOpacity
          accessibilityLabel="Facebook"
          accessibilityRole="link"
          onPress={() =>
            openWebUrl('https://www.facebook.com/gemeenteamsterdam')
          }
          style={styles.icon}>
          <Facebook fill={color.touchable.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Twitter"
          accessibilityRole="link"
          onPress={() => openWebUrl('https://twitter.com/AmsterdamNL')}
          style={styles.icon}>
          <Twitter fill={color.touchable.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Instagram"
          accessibilityRole="link"
          onPress={() =>
            openWebUrl('https://www.instagram.com/gemeenteamsterdam/')
          }
          style={styles.icon}>
          <Instagram fill={color.touchable.primary} />
        </TouchableOpacity>
      </Row>
      <Gutter height="xl" />
    </Box>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    aspectRatio: 1,
  },
})
