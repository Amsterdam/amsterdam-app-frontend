import {
  PIWIK_PRO_ID,
  PIWIK_PRO_ID_ACCEPT,
  PIWIK_PRO_URL,
  PIWIK_PRO_URL_ACCEPT,
} from '@env'
import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {isProductionApp} from '@/processes/development'
import {PiwikError} from '@/processes/piwik/types'

const [URL, ID] = isProductionApp
  ? [PIWIK_PRO_URL, PIWIK_PRO_ID]
  : [PIWIK_PRO_URL_ACCEPT, PIWIK_PRO_ID_ACCEPT]

export const initPiwik = async (): Promise<void> => {
  if (!URL || !ID) {
    return Promise.reject(PiwikError.missingEnvVars)
  }

  await PiwikProSdk.init(URL, ID)
  await PiwikProSdk.trackApplicationInstall()
  await PiwikProSdk.setIncludeDefaultCustomVariables(true)
}
