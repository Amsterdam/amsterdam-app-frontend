import {CustomDimensions as PiwikCustomDimensions} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {CustomDimensions, PiwikDimension} from '@/processes/piwik/types'
import {filterOutUndefinedProperties} from '@/utils/object'

export const addIdFromParamsToCustomDimensions = (
  customDimensions?: CustomDimensions,
  params?: Record<string, unknown>,
) => {
  if (!params?.id && typeof params?.id !== 'number') {
    return filterOutUndefinedProperties(customDimensions) as
      | PiwikCustomDimensions
      | undefined
  }

  return {
    ...filterOutUndefinedProperties(customDimensions),
    [PiwikDimension.contentId]: params.id.toString(),
  } as PiwikCustomDimensions
}
