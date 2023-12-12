import {useCallback} from 'react'
import {Linking} from 'react-native'
import {useSentry} from '@/hooks/sentry/useSentry'
import {getStoreLink} from '@/utils/getStoreLink'

export const useOpenStore = () => {
  const {sendSentryErrorLog} = useSentry()

  return useCallback(() => {
    const link = getStoreLink()
    const log = (error: unknown) => sendSentryErrorLog('', '', {error})

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
