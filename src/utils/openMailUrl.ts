import {Alert, Linking} from 'react-native'

export const openMailUrl = (emailAddress: string, subject?: string) => {
  let mailUrl = `mailto:${emailAddress}`
  if (subject) {
    mailUrl += `?subject=${subject}`
  }

  Linking.canOpenURL(mailUrl)
    .then(supported => {
      if (!supported) {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
      } else {
        return Linking.openURL(mailUrl)
      }
    })
    .catch(err => console.log(err))
}
