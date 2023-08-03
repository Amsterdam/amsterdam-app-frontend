import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {createContext, ReactNode} from 'react'
import {useEffect, useState} from 'react'
import {useSentry} from '@/hooks'
import {isProductionApp} from '@/processes/development'
import {PiwikProSdkType} from '@/types/piwik.temp'

// temporary fix for typing, see: src/types/piwik.temp
const PiwikPro = PiwikProSdk as PiwikProSdkType

enum PiwikError {
  alreadyInitialized = 'Piwik Pro SDK has been already initialized',
  missingEnvVars = 'PIWIK_PRO_URL or PIWIK_PRO_ID are not defined in env',
}

const PIWIK_PRO_URL = isProductionApp
  ? process.env.PIWIK_PRO_URL
  : process.env.PIWIK_PRO_URL_ACCEPT

const PIWIK_PRO_ID = isProductionApp
  ? process.env.PIWIK_PRO_ID
  : process.env.PIWIK_PRO_ID_ACCEPT

const initPiwik = () => {
  if (!PIWIK_PRO_URL || !PIWIK_PRO_ID) {
    return Promise.reject(PiwikError.missingEnvVars)
  }

  return PiwikPro.init(PIWIK_PRO_URL, PIWIK_PRO_ID)
}

type PiwikContextType = PiwikProSdkType | null | undefined

/**
 * The PiwikContext contains the object with all methods, to be used via the usePiwik hook only. It is undefined when not initialized and null when initilization failed.
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
          setPiwikInstance(PiwikPro)
        })
        .catch((error: Error) => {
          setPiwikInstance(null)

          if (
            error.message === PiwikError.alreadyInitialized ||
            error.message === PiwikError.missingEnvVars
          ) {
            return
          }

          sendSentryErrorLog('Piwik initialization failed', 'useInitPiwik.ts', {
            error,
          })
        })
    }
  }, [piwikInstance, sendSentryErrorLog])

  return (
    <PiwikContext.Provider value={piwikInstance}>
      {children}
    </PiwikContext.Provider>
  )
}
