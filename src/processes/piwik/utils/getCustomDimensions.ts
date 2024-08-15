import {
  type CustomDimensions,
  PiwikSessionDimension,
  CustomDimensionKeys,
  PiwikDimension,
} from '@/processes/piwik/types'
import {filterOutUndefinedProperties} from '@/utils/object'
import {VERSION_NUMBER, VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

const DEFAULT_DIMENSIONS: CustomDimensions = {
  [PiwikSessionDimension.appVersion]: VERSION_NUMBER,
  [PiwikSessionDimension.appVersionWithBuild]: VERSION_NUMBER_WITH_BUILD,
}

const getDimensions = (
  inputObj: CustomDimensions,
  forAppInsights = false,
): CustomDimensions => {
  if (!forAppInsights) {
    return inputObj
  }

  /**
   * Convert the keys to the AppInsights format.
   */
  return (Object.keys(inputObj) as unknown as CustomDimensionKeys[]).reduce<
    Record<string, string>
  >((acc, key) => {
    const newKey = PiwikSessionDimension[key] ?? PiwikDimension[key]

    if (newKey) {
      acc[newKey] = inputObj[key] as string
    }

    return acc
  }, {})
}

export const getCustomDimensions = (
  customDimensions?: CustomDimensions,
  forAppInsights = false,
) =>
  filterOutUndefinedProperties(
    getDimensions(
      {
        ...DEFAULT_DIMENSIONS,
        ...customDimensions,
      },
      forAppInsights,
    ),
  )
