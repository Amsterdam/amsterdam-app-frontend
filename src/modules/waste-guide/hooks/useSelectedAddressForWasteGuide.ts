import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ModuleSlug} from '@/modules/slugs'

/**
 * Return the selected addres and metadata, for waste guide specifically.
 * If the locationType is set to 'location', the address matching the *last known* location is returned (as opposed to the address matching the current location).
 */
export const useSelectedAddressForWasteGuide = () =>
  useSelectedAddress(ModuleSlug['waste-guide'], true)
