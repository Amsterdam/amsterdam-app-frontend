import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'

/**
 * Determines whether features dependent on address/location can display results
 */
export const useHasValidLocation = () => {
  const {address} = useSelectedAddress()

  return !!address
}
