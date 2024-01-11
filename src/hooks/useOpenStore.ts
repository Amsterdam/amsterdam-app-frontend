import {useCallback} from 'react'
import {Linking} from 'react-native'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {getStoreLink} from '@/utils/getStoreLink'

export const useOpenStore = () => {
  const {sendSentryErrorLog} = useSentry()

  return useCallback(() => {
    const link = getStoreLink()
    const log = (error: unknown) =>
      sendSentryErrorLog(SentryErrorLogKey.openStore, 'useOpenStore.ts', {
        error,
      })

    Linking.canOpenURL(link)
      .then(supported => {
        if (!supported) {
          throw new Error('canOpenURL failed')
        }

        Linking.openURL(link).catch(log)
      })
      .catch(log)
  }, [sendSentryErrorLog])
}
