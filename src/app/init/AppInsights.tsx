import {useAddTelemetryInitializer} from '@/processes/logging/hooks/useAddTelemetryInitializer'

export const AppInsights = () => {
  useAddTelemetryInitializer()

  return null
}
