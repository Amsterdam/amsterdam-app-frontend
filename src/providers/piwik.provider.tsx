import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {createContext, ReactNode, useEffect, useState} from 'react'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {initPiwik} from '@/processes/piwik/init'
import {PiwikError} from '@/processes/piwik/types'

type PiwikContextType = PiwikProSdkType | null | undefined

/**
 * The PiwikContext contains the object with all methods, to be used via the usePiwik hook only.
 */
export const PiwikContext = createContext<PiwikContextType>(undefined)

type Props = {
  children?: ReactNode
}

export const PiwikProvider = ({children}: Props) => {
  const trackException = useTrackException()
  const [piwikInstance, setPiwikInstance] = useState<PiwikContextType>()

  useEffect(() => {
    if (piwikInstance === undefined) {
      initPiwik()
        .then(() => {
          setPiwikInstance(PiwikProSdk)
        })
        .catch((error: Error) => {
          if ((error.message as PiwikError) === PiwikError.alreadyInitialized) {
            setPiwikInstance(PiwikProSdk)

            return
          }

          setPiwikInstance(null)

          if ((error.message as PiwikError) === PiwikError.missingEnvVars) {
            return
          }

          trackException(
            ExceptionLogKey.piwikInitialization,
            'piwik.provider.tsx',
            {
              error,
            },
          )
        })
    }
  }, [piwikInstance, trackException])

  return (
    <PiwikContext.Provider value={piwikInstance}>
      {children}
    </PiwikContext.Provider>
  )
}
