import {useCallback} from 'react'
import {Alert, Linking, Platform} from 'react-native'
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
          sendSentryErrorLog(
            SentryErrorLogKey.notSupportedStoredUrl,
            'useOpenStore.ts',
          )
        }

        Linking.openURL(link).catch(() =>
          Alert.alert(
            `${Platform.OS === 'ios' ? 'App' : 'Google Play'} Store openen is niet mogelijk.`,
            `Ga naar de ${Platform.OS === 'ios' ? 'Google App' : 'Play'} Store om de app handmatig te updaten.`,
            [
              {
                text: 'Sluiten',
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            },
          ),
        )
      })
      .catch(log)
  }, [sendSentryErrorLog])
}
