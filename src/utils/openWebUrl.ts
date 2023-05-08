import {Alert, Linking} from 'react-native'
import {getSendSentryErrorLog} from '@/processes'

export const openWebUrl = async (url: string) => {
  try {
    await Linking.openURL(url)
  } catch (error) {
    Alert.alert('Sorry, deze functie is niet beschikbaar.')
    const sendSentryErrorLog = getSendSentryErrorLog(true)
    sendSentryErrorLog('openWebUrl error', 'openWeb.ts', {error})
  }
}
