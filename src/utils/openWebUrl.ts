import {Alert, Linking} from 'react-native'

export const openWebUrl = async (url: string) => {
  try {
    await Linking.openURL(url)
  } catch (e) {
    Alert.alert('Sorry, deze functie is niet beschikbaar.')
  }
}
