import {CustomDimensions, PiwikDimension} from '@/processes/piwik/types'

export const addIdFromParamsToDimensions = (
  customDimensions?: CustomDimensions,
  params?: Record<string, unknown>,
) => {
  if (!params?.id && typeof params?.id !== 'number') {
    return customDimensions
  }

  return {
    ...customDimensions,
    [PiwikDimension.contentId]: params.id.toString(),
  }
}
