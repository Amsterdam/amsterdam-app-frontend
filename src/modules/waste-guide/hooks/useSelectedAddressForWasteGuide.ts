import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {useLocationType} from '@/modules/waste-guide/hooks/useLocationType'

/**
 * Return location info depending on the selected location type for waste guide specifically
 */
export const useSelectedAddressForWasteGuide = () => {
  const locationType = useLocationType()

  return {locationType, ...useSelectedAddress(locationType, true)}
}
