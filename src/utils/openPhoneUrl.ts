import {Alert, Linking, Platform} from 'react-native'

export const openPhoneUrl = (phoneNumber: string) => {
  let phoneUrl = ''

  if (Platform.OS !== 'android') {
    phoneUrl = `telprompt:${phoneNumber}`
  } else {
    phoneUrl = `tel:${phoneNumber}`
  }

  Linking.canOpenURL(phoneUrl)
    .then(supported => {
      if (!supported) {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
      } else {
        return Linking.openURL(phoneUrl)
      }
    })
    .catch(err => console.log(err))
}
