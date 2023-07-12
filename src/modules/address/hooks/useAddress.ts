import {selectAddress} from '@/modules/address/slice'
import {useAppSelector} from '@/store/hooks'

export const useAddress = () => useAppSelector(selectAddress)
