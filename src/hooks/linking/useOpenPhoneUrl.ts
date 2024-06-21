import {useCallback} from 'react'
import {Alert, Linking, Platform} from 'react-native'
import {usePiwik} from '@/processes/logging/hooks/usePiwik'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'

export type OpenPhoneUrl = (phoneNumber: string) => void

export const useOpenPhoneUrl = (): OpenPhoneUrl => {
  const {sendSentryErrorLog} = useSentry()
  const {trackOutlink} = usePiwik()

  return useCallback(
    (phoneNumber: string) => {
      let phoneUrl = ''

      if (Platform.OS === 'ios') {
        phoneUrl = `telprompt:${phoneNumber}`
      } else {
        phoneUrl = `tel:${phoneNumber}`
      }

      trackOutlink(phoneUrl)

      Linking.openURL(phoneUrl).catch(() => {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
        sendSentryErrorLog(SentryErrorLogKey.openPhoneUrl, 'useOpenPhoneUrl.ts')
      })
    },
    [sendSentryErrorLog, trackOutlink],
  )
}
