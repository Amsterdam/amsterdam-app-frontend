import {
  APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV,
  APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_TEST,
  APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_ACC,
  APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_PROD,
} from '@env'
import {ReactNativePlugin} from '@microsoft/applicationinsights-react-native'
import {ApplicationInsights, Snippet} from '@microsoft/applicationinsights-web'
import {createContext, ReactNode, useContext} from 'react'
import {getStartupTimeSync} from 'react-native-device-info'
import {Environment, EnvUrlMap} from '@/environment'
import {isProductionApp} from '@/processes/development'
import {EventLogKey} from '@/processes/logging/types'

const environmentInstrumentationKey: EnvUrlMap = {
  [Environment.custom]: APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV ?? '',
  [Environment.development]: APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV ?? '',
  [Environment.test]: APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_TEST ?? '',
  [Environment.acceptance]: APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_ACC ?? '',
  [Environment.production]: APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_PROD ?? '',
}

export const getApplicationInsightsConfig = (
  environment: Environment,
): Snippet => ({
  config: {
    instrumentationKey:
      environmentInstrumentationKey[environment] ??
      environmentInstrumentationKey[Environment.production],
    extensions: [RNPlugin],
    excludeRequestFromAutoTrackingPatterns: [
      /https:\/\/clients3.google.com\/generate_204\?.*/,
      /https:\/\/js.monitor.azure.com.*/,
      /http:\/\/[^/a-z]+\/(index.bundle\/\/?)?symbolicate/,
    ],
  },
})

const RNPlugin = new ReactNativePlugin()

export const appInsights = new ApplicationInsights(
  getApplicationInsightsConfig(
    isProductionApp ? Environment.production : Environment.development,
  ),
)

appInsights.loadAppInsights()

if (!__DEV__) {
  appInsights.trackMetric({
    name: EventLogKey.nativeStartup,
    average: new Date().getTime() - Number(getStartupTimeSync()),
  })
}

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
