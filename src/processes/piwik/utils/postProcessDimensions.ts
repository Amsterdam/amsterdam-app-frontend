import {
  type CustomDimensions,
  PiwikSessionDimension,
} from '@/processes/piwik/types'
import {filterOutUndefinedProperties} from '@/utils/object'
import {VERSION_NUMBER, VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

const DEFAULT_DIMENSIONS: CustomDimensions = {
  [PiwikSessionDimension.appVersion]: VERSION_NUMBER,
  [PiwikSessionDimension.appVersionWithBuild]: VERSION_NUMBER_WITH_BUILD,
}

/**
 * Add the default dimensions to a customDimensions object, filters out undefined values and casts to the correct type.
 */
export const postProcessDimensions = (customDimensions?: CustomDimensions) =>
  filterOutUndefinedProperties({
    ...customDimensions,
    ...DEFAULT_DIMENSIONS,
  })
