import {Alert, Linking} from 'react-native'
import {useSentry} from '@/hooks/sentry/useSentry'

export type OpenWebUrl = (url: string) => void

export const useOpenWebUrl = (): OpenWebUrl => {
  const {sendSentryErrorLog} = useSentry()

  return (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Sorry, deze functie is niet beschikbaar.')
      sendSentryErrorLog('useOpenWebUrl error', 'useOpenWebUrl.ts', {url})
    })
  }
}
