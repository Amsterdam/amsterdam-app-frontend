import {
  PIWIK_PRO_ID,
  PIWIK_PRO_ID_ACCEPT,
  PIWIK_PRO_URL,
  PIWIK_PRO_URL_ACCEPT,
} from '@env'
import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {createContext, ReactNode} from 'react'
import {useEffect, useState} from 'react'
import {isProductionApp} from '@/processes/development'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'

enum PiwikError {
  alreadyInitialized = 'Piwik Pro SDK has been already initialized',
  missingEnvVars = 'PIWIK_PRO_URL or PIWIK_PRO_ID are not defined in env',
}

const URL = isProductionApp ? PIWIK_PRO_URL : PIWIK_PRO_URL_ACCEPT

const ID = isProductionApp ? PIWIK_PRO_ID : PIWIK_PRO_ID_ACCEPT

const initPiwik = async (): Promise<void> => {
  if (!URL || !ID) {
    return Promise.reject(PiwikError.missingEnvVars)
  }

  await PiwikProSdk.init(URL, ID)
  await PiwikProSdk.trackApplicationInstall()
  await PiwikProSdk.setIncludeDefaultCustomVariables(true)
}

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
          if (error.message === 'Piwik Pro SDK has been already initialized') {
            return
          }

          setPiwikInstance(null)

          if (
            error.message === PiwikError.alreadyInitialized ||
            error.message === PiwikError.missingEnvVars
          ) {
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
