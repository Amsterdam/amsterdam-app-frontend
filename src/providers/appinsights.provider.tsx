import {ReactNativePlugin} from '@microsoft/applicationinsights-react-native'
import {ApplicationInsights, Snippet} from '@microsoft/applicationinsights-web'
import {createContext, ReactNode, useContext} from 'react'
import {Environment, EnvUrlMap} from '@/environment'
import {isProductionApp} from '@/processes/development'

const environmentInstrumentationKey: EnvUrlMap = {
  // eslint-disable-next-line sonarjs/no-duplicate-string
  [Environment.custom]: 'cd99e81f-a8f6-421d-845d-d00e0448655a',
  [Environment.development]: 'cd99e81f-a8f6-421d-845d-d00e0448655a',
  [Environment.test]: 'c84d291c-ffe6-4aea-9409-bd1cdf62ad98',
  [Environment.acceptance]: 'cd99e81f-a8f6-421d-845d-d00e0448655a', // TODO: enter acc key
  [Environment.production]: 'cd99e81f-a8f6-421d-845d-d00e0448655a', // TODO: enter prod key
}

export const getApplicationInsightsConfig = (
  environment: Environment,
): Snippet => ({
  config: {
    instrumentationKey: environmentInstrumentationKey[environment],
    extensions: [RNPlugin],
    excludeRequestFromAutoTrackingPatterns: [
      /https:\/\/clients3.google.com\/generate_204\?.*/,
      /https:\/\/js.monitor.azure.com.*/,
      /http:\/\/[^/a-z]+\/(index.bundle\/\/?)?symbolicate/,
    ],
  },
})

const RNPlugin = new ReactNativePlugin()
const appInsights = new ApplicationInsights(
  getApplicationInsightsConfig(
    isProductionApp ? Environment.production : Environment.development,
  ),
)

appInsights.loadAppInsights()

export const AppInsightsContext = createContext(appInsights)

type Props = {
  children: ReactNode
}

export const AppInsightsProvider = ({children}: Props) => (
  <AppInsightsContext.Provider value={appInsights}>
    {children}
  </AppInsightsContext.Provider>
)

export const useAppInsights = () => useContext(AppInsightsContext)
