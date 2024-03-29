import {useCallback} from 'react'
import {Alert, Linking, Platform} from 'react-native'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {STORE_LINK} from '@/utils/storeLink'

export const useOpenStore = () => {
  const {sendSentryErrorLog} = useSentry()
  const {trackOutlink} = usePiwik()

  return useCallback(() => {
    const log = (error: unknown) =>
      sendSentryErrorLog(SentryErrorLogKey.openStore, 'useOpenStore.ts', {
        error,
      })

    Linking.canOpenURL(STORE_LINK)
      .then(supported => {
        trackOutlink(STORE_LINK)

        if (!supported) {
          sendSentryErrorLog(
            SentryErrorLogKey.notSupportedStoredUrl,
            'useOpenStore.ts',
          )
        }

        Linking.openURL(STORE_LINK).catch(() =>
          Alert.alert(
            `${Platform.OS === 'ios' ? 'App' : 'Google Play'} Store openen is niet mogelijk.`,
            `Ga naar de ${Platform.OS === 'ios' ? 'App' : 'Google Play'} Store om de app handmatig te updaten.`,
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
  }, [sendSentryErrorLog, trackOutlink])
}
