import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ModuleSlug} from '@/modules/slugs'

/**
 * Return the selected address and metadata, for construction-work specifically.
 * If the locationType is set to 'location', the address matching the *last known* location is returned (as opposed to the address matching the current location).
 */
export const useSelectedAddressForConstructionWork = () =>
  useSelectedAddress(ModuleSlug['construction-work'])
