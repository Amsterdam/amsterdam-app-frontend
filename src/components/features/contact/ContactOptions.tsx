import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Facebook from '@amsterdam/asc-assets/static/icons/Facebook.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import Twitter from '@amsterdam/asc-assets/static/icons/Twitter.svg'
import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {Instagram, Whatsapp} from '../../../assets/icons'
import {color} from '../../../tokens'
import {accessibleText, openPhoneUrl} from '../../../utils'
import {openWebUrl} from '../../../utils/openWebUrl'
import {Box, Title} from '../../ui'
import {Column, Gutter, Row} from '../../ui/layout'
import {ContactOption} from './ContactOption'

const optionsTextContent = {
  chat: {
    title: 'WhatsApp 06 44 44 06 55',
    a11yTitle:
      'Whatsapp nul zes vierenveertig vierenveertig nul zes vijfenvijftig',
    text: 'reactie binnen twee uur',
  },
  email: {
    title: 'Contactformulier',
    text: 'Reactie binnen 1 werkdag',
  },
  phone: {
    title: 'Bel 14 020',
    a11yTitle: 'Bel veertien nul twintig',
    text: 'Gemiddeld 5 minuten wachten',
  },
}

export const ContactOptions = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Contact'>>()
  const {chat, email, phone} = optionsTextContent

  return (
    <Box background="white">
      <Title level={2} text="Neem contact op" />
      <Gutter height="md" />
      <Column gutter="sm">
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={accessibleText(email.title, email.text)}
          onPress={() =>
            navigation.navigate(routes.webView.name, {
              sliceFromTop: {portrait: 50, landscape: 50},
              title: 'Neem contact op',
              url: 'https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx',
            })
          }>
          <ContactOption
            icon={<Email fill={color.touchable.primary} />}
            title={email.title}
            text={email.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={accessibleText(phone.a11yTitle, phone.text)}
          accessibilityRole="link"
          onPress={() => openPhoneUrl('+3114020')}>
          <ContactOption
            icon={<Phone fill={color.touchable.primary} />}
            title={phone.title}
            text={phone.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={accessibleText(chat.a11yTitle, chat.text)}
          accessibilityRole="link"
          onPress={() => openWebUrl('https://wa.me/31644440655')}>
          <ContactOption
            icon={<Whatsapp fill={color.touchable.primary} />}
            title={chat.title}
            text={chat.text}
          />
        </TouchableOpacity>
      </Column>
      <Gutter height="lg" />
      <Title
        level={4}
        text="U kunt ook contact opnemen via één van onze social kanalen"
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
