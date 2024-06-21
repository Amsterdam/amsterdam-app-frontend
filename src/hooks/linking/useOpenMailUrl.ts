import {useCallback} from 'react'
import {Alert, Linking} from 'react-native'
import {usePiwik} from '@/processes/logging/hooks/usePiwik'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'

export type OpenMailUrl = (emailAddress: string, subject?: string) => void

export const useOpenMailUrl = (): OpenMailUrl => {
  const {sendSentryErrorLog} = useSentry()
  const {trackOutlink} = usePiwik()

  return useCallback(
    (emailAddress: string, subject?: string) => {
      let mailUrl = `mailto:${emailAddress}`

      if (subject) {
        mailUrl += `?subject=${encodeURIComponent(subject)}`
      }

      trackOutlink(mailUrl)

      Linking.openURL(mailUrl).catch(() => {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
        sendSentryErrorLog(SentryErrorLogKey.openMailUrl, 'useOpenMailUrl.ts')
      })
    },
    [sendSentryErrorLog, trackOutlink],
  )
}
