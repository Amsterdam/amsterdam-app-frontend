import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ModuleSlug} from '@/modules/slugs'

/**
 * Return the selected addres and metadata, depending on the selected location type, for waste guide specifically.
 */
export const useSelectedAddressForWasteGuide = () =>
  useSelectedAddress(ModuleSlug['waste-guide'], true)
