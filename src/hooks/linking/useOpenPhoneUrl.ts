import {Alert, Linking, Platform} from 'react-native'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'

export type OpenPhoneUrl = (phoneNumber: string) => void

export const useOpenPhoneUrl = (): OpenPhoneUrl => {
  const {sendSentryErrorLog} = useSentry()

  return (phoneNumber: string) => {
    let phoneUrl = ''

    if (Platform.OS !== 'android') {
      phoneUrl = `telprompt:${phoneNumber}`
    } else {
      phoneUrl = `tel:${phoneNumber}`
    }

    Linking.openURL(phoneUrl).catch(() => {
      Alert.alert('Sorry, deze functie is niet beschikbaar.')
      sendSentryErrorLog(SentryErrorLogKey.openPhoneUrl, 'useOpenPhoneUrl.ts', {
        phoneUrl,
      })
    })
  }
}
