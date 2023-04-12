import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {createContext, ReactNode} from 'react'
import {useEffect, useState} from 'react'
import {useSentry} from '@/hooks'
import {PiwikProSdkType} from '@/types/piwik.temp'

const PiwikPro = PiwikProSdk as PiwikProSdkType

const initPiwik = () => {
  if (!process.env.PIWIK_PRO_URL || !process.env.PIWIK_PRO_ID) {
    throw new Error('PIWIK_PRO_URL or PIWIK_PRO_ID are not defined in env')
  }

  return PiwikPro.init(process.env.PIWIK_PRO_URL, process.env.PIWIK_PRO_ID)
}

type Props = {
  children?: ReactNode
}

export const PiwikContext = createContext<PiwikProSdkType | null>(null)

export const PiwikProvider = ({children}: Props) => {
  const {sendSentryErrorLog} = useSentry()
  const [piwikInstance, setPiwikInstance] = useState<PiwikProSdkType | null>(
    null,
  )

  useEffect(() => {
    if (!piwikInstance) {
      initPiwik()
        .then(() => {
          setPiwikInstance(PiwikPro)
        })
        .catch((error: unknown) => {
          if (
            (error as {message: string}).message ===
            'Piwik Pro SDK has been already initialized'
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
