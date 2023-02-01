import {Alert, Linking} from 'react-native'

export const openMailUrl = (emailAddress: string, subject?: string) => {
  let mailUrl = `mailto:${emailAddress}`
  if (subject) {
    mailUrl += `?subject=${encodeURIComponent(subject)}`
  }

  Linking.openURL(mailUrl).catch(() => {
    Alert.alert('Sorry, deze functie is niet beschikbaar.')
  })
}
