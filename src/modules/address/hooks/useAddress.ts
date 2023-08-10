import {useSelector} from '@/hooks/redux/useSelector'
import {selectAddress} from '@/modules/address/slice'

export const useAddress = () => useSelector(selectAddress)
