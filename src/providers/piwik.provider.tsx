import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {createContext, ReactNode} from 'react'
import {useEffect, useState} from 'react'
import {initPiwik} from '@/processes/piwik/init'
import {PiwikError} from '@/processes/piwik/types'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'

type PiwikContextType = PiwikProSdkType | null | undefined

/**
 * The PiwikContext contains the object with all methods, to be used via the usePiwik hook only.
 */
export const PiwikContext = createContext<PiwikContextType>(undefined)

type Props = {
  children?: ReactNode
}

export const PiwikProvider = ({children}: Props) => {
  const {sendSentryErrorLog} = useSentry()
  const [piwikInstance, setPiwikInstance] = useState<PiwikContextType>()

  useEffect(() => {
    if (piwikInstance === undefined) {
      initPiwik()
        .then(() => {
          setPiwikInstance(PiwikProSdk)
        })
        .catch((error: Error) => {
          if (error.message === PiwikError.alreadyInitialized) {
            return
          }

          setPiwikInstance(null)

          if (error.message === PiwikError.missingEnvVars) {
            return
          }

          sendSentryErrorLog(
            SentryErrorLogKey.piwikInitialization,
            'piwik.provider.tsx',
            {
              error,
            },
          )
        })
    }
  }, [piwikInstance, sendSentryErrorLog])

  return (
    <PiwikContext.Provider value={piwikInstance}>
      {children}
    </PiwikContext.Provider>
  )
}
