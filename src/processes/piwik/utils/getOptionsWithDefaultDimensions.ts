import {
  TrackCustomEventOptions,
  CommonEventOptions,
  TrackScreenOptions,
} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {
  CustomDimensions,
  PiwikSessionDimension,
  ReplaceCustomDimensions,
} from '@/processes/piwik/types'
import {filterOutUndefinedProperties} from '@/utils/object'
import {VERSION_NUMBER, VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

const DEFAULT_DIMENSIONS: CustomDimensions = {
  [PiwikSessionDimension.appVersion]: VERSION_NUMBER,
  [PiwikSessionDimension.appVersionWithBuild]: VERSION_NUMBER_WITH_BUILD,
}

/**
 * Add the default dimensions to any options object
 */
export const getOptionsWithDefaultDimensions = <
  T extends CommonEventOptions | TrackCustomEventOptions | TrackScreenOptions,
>(
  options?: ReplaceCustomDimensions<T>,
): T =>
  ({
    ...options,
    customDimensions: filterOutUndefinedProperties({
      ...options?.customDimensions,
      ...DEFAULT_DIMENSIONS,
    }),
  }) as T
