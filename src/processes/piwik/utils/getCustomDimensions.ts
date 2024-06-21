import {
  type CustomDimensions,
  PiwikSessionDimension,
  CustomDimensionKeys,
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

  const outputObj: CustomDimensions = {}

  Object.keys(inputObj).forEach(key => {
    const newKey = PiwikSessionDimension[key as unknown as CustomDimensionKeys]

    outputObj[newKey as unknown as CustomDimensionKeys] =
      inputObj[key as unknown as CustomDimensionKeys]
  })

  return outputObj
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
