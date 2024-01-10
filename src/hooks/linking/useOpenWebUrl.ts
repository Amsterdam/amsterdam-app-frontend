import {Alert, Linking} from 'react-native'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'

export type OpenWebUrl = (url: string) => void

export const useOpenWebUrl = (): OpenWebUrl => {
  const {sendSentryErrorLog} = useSentry()

  return (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Sorry, deze functie is niet beschikbaar.')
      sendSentryErrorLog(SentryErrorLogKey.openWebUrl, 'useOpenWebUrl.ts', {
        url,
      })
    })
  }
}
