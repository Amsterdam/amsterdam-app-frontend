import {Alert, Linking, Platform} from 'react-native'
import {useSentry} from '@/hooks/useSentry'

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
      sendSentryErrorLog('useOpenPhoneUrl error', 'useOpenPhoneUrl.ts', {
        phoneUrl,
      })
    })
  }
}
