import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {addLocation} from '@/modules/address/slice'
import {AddressList} from '@/modules/address/types'
import {addDerivedAddressFields} from '@/modules/address/utils/addDerivedAddressFields'

/**
 * Saves the address in redux in correct format.
 */
export const useSaveAddress = (addresses?: AddressList) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!addresses?.length || addresses[0].type !== 'adres') {
      return
    }

    const firstAddress = addDerivedAddressFields(addresses[0])

    dispatch(addLocation(firstAddress))
  }, [dispatch, addresses])
}
