import {type CustomDimensions, PiwikDimension} from '@/processes/piwik/types'
import {getCustomDimensions} from '@/processes/piwik/utils/getCustomDimensions'

export const createCustomDimensionsFromRouteParams = (
  params?: Record<string, unknown>,
): {
  appInsights: CustomDimensions | undefined
  piwik: CustomDimensions | undefined
} => {
  const result: CustomDimensions = {}

  if (typeof params?.id === 'string' || typeof params?.id === 'number') {
    result[PiwikDimension.contentId] = params.id.toString()
  }

  return {
    appInsights: getCustomDimensions(result, true),
    piwik: getCustomDimensions(result, false),
  }
}
