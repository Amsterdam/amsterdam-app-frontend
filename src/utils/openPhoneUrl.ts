import {Alert, Linking, Platform} from 'react-native'
import {getSendSentryErrorLog} from '@/processes'

export const openPhoneUrl = async (phoneNumber: string) => {
  let phoneUrl = ''

  if (Platform.OS !== 'android') {
    phoneUrl = `telprompt:${phoneNumber}`
  } else {
    phoneUrl = `tel:${phoneNumber}`
  }

  try {
    await Linking.openURL(phoneUrl)
  } catch (error) {
    Alert.alert('Sorry, deze functie is niet beschikbaar.')
    const sendSentryErrorLog = getSendSentryErrorLog(true)
    sendSentryErrorLog('openPhoneUrl error', 'openPhoneUrl.ts', {error})
  }
}
