import {Alert, Linking} from 'react-native'

export const openMailUrl = async (emailAddress: string, subject?: string) => {
  let mailUrl = `mailto:${emailAddress}`
  if (subject) {
    mailUrl += `?subject=${subject}`
  }

  try {
    Linking.openURL(mailUrl)
  } catch (e) {
    Alert.alert('Sorry, deze functie is niet beschikbaar.')
  }
}
