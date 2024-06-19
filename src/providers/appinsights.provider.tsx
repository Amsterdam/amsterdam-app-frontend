import {ReactNativePlugin} from '@microsoft/applicationinsights-react-native'
import {ApplicationInsights} from '@microsoft/applicationinsights-web'
import {createContext, ReactNode, useContext} from 'react'

const RNPlugin = new ReactNativePlugin()
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: 'cd99e81f-a8f6-421d-845d-d00e0448655a',
    extensions: [RNPlugin],
    excludeRequestFromAutoTrackingPatterns: [
      /https:\/\/clients3.google.com\/generate_204\?.*/,
      /https:\/\/js.monitor.azure.com.*/,
      /http:\/\/[^/a-z]+\/(index.bundle\/\/?)?symbolicate/,
    ],
  },
})

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
