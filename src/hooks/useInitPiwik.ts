import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {useEffect, useState} from 'react'
import {useSentry} from '@/hooks'
import {devLog} from '@/processes'

const initPiwik = async () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  (await PiwikProSdk.init(
    'https://dap.amsterdam.nl/containers/',
    'e63312c0-0efe-4c4f-bba1-3ca1f05374a8',
  )) as Promise<void>

export const useInitPiwik = () => {
  const [done, setDone] = useState(false)
  const {sendSentryErrorLog} = useSentry()

  useEffect(() => {
    if (!done) {
      initPiwik()
        .then(() => {
          devLog('gelukt!')
        })
        .catch((e: unknown) => {
          devLog('error', e)
          // sendSentryErrorLog('Piwik initialization failed', 'useInitPiwik.ts')
        })
        .finally(() => setDone(true))
    }
  }, [done, sendSentryErrorLog])
}
