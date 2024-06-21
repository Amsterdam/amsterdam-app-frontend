import {ITelemetryItem} from '@microsoft/applicationinsights-web'
import {useContext} from 'react'
import {AppInsightsContext} from '@/providers/appinsights.provider'

export const useAppInsights = () => {
  const appInsightsContext = useContext(AppInsightsContext)

  const addTelemetryInitializer = (
    telemetryInitializer: (envelope: ITelemetryItem) => boolean | void,
  ) => {
    appInsightsContext.addTelemetryInitializer(telemetryInitializer)
  }

  return {appInsights: appInsightsContext, addTelemetryInitializer}
}
