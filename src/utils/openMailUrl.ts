import {Alert, Linking} from 'react-native'
import {getSendSentryErrorLog} from '@/processes'

export const openMailUrl = async (emailAddress: string, subject?: string) => {
  let mailUrl = `mailto:${emailAddress}`
  if (subject) {
    mailUrl += `?subject=${encodeURIComponent(subject)}`
  }
  try {
    await Linking.openURL(mailUrl)
  } catch (error) {
    Alert.alert('Sorry, deze functie is niet beschikbaar.')
    const sendSentryErrorLog = getSendSentryErrorLog(true)
    sendSentryErrorLog('openMailUrl error', 'openMailUrl.ts', {error})
  }
}
