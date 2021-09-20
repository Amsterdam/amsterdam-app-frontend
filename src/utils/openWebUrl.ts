import {Alert, Linking} from 'react-native'

export const openWebUrl = (url: string) => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
      } else {
        return Linking.openURL(url)
      }
    })
    .catch(err => console.log(err))
}
