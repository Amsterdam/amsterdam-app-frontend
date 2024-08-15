import {type CustomDimensions, PiwikDimension} from '@/processes/piwik/types'
import {getCustomDimensions} from '@/processes/piwik/utils/getCustomDimensions'

export const createCustomDimensionsFromRouteParams = (
  params?: Record<string, unknown>,
): {
  appInsights: CustomDimensions | undefined
  piwik: CustomDimensions | undefined
} => {
  const result: CustomDimensions = {}

  if (params) {
    Object.keys(params).forEach(key => {
      if (typeof params[key] !== 'string' && typeof params[key] !== 'number') {
        return
      }

      const transformedKey = key === 'id' ? 'contentId' : key

      if (Object.values(PiwikDimension).includes(transformedKey)) {
        result[PiwikDimension[transformedKey as keyof typeof PiwikDimension]] =
          params[key].toString()
      }
    })
  }

  return {
    appInsights: getCustomDimensions(result, true),
    piwik: getCustomDimensions(result, false),
  }
}
