import {useLocationInfo} from '@/modules/address/hooks/useLocationInfo'
import {useLocationType} from '@/modules/waste-guide/hooks/useLocationType'

/**
 * Return location info depending on the selected location type for waste guide specifically
 */
export const useWasteGuideLocationInfo = () => {
  const locationType = useLocationType()

  return {locationType, ...useLocationInfo(locationType, true)}
}
