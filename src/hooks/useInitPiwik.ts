import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {useEffect, useState} from 'react'
import {useSentry} from '@/hooks'
import {devLog, isDevApp} from '@/processes'

const config = {
  acceptance: [
    'https://dap.amsterdam.nl',
    '9a752692-3faf-4677-8d36-08b01ce60cc4',
  ],
  production: [
    'https://dap.amsterdam.nl',
    '9a752692-3faf-4677-8d36-08b01ce60cc4',
  ],
}

const initPiwik = async () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  (await PiwikProSdk.init(
    ...config[isDevApp ? 'acceptance' : 'production'],
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
          if (
            (e as {message: string}).message ===
            'Piwik Pro SDK has been already initialized'
          ) {
            return
          }
          sendSentryErrorLog('Piwik initialization failed', 'useInitPiwik.ts')
        })
        .finally(() => setDone(true))
    }
  }, [done, sendSentryErrorLog])
}
