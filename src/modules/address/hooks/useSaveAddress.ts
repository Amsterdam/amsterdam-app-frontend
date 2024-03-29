import {useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {addLocation} from '@/modules/address/slice'
import {PdokAddress} from '@/modules/address/types'
import {transformAddressApiResponse} from '@/modules/address/utils/transformAddressApiResponse'

/**
 * Saves the address in redux in correct format.
 */
export const useSaveAddress = (pdokAddresses?: PdokAddress[]) => {
  const dispatch = useDispatch()

  useMemo(() => {
    if (!pdokAddresses?.length) {
      return
    }

    const firstAddress = transformAddressApiResponse(pdokAddresses[0])

    dispatch(addLocation(firstAddress))
  }, [dispatch, pdokAddresses])
}
