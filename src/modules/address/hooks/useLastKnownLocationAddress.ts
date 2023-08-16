import {useSelector} from '@/hooks/redux/useSelector'
import {selectLastKnownLocationAddress} from '@/modules/address/slice'

export const useLastKnownLocationAddress = () =>
  useSelector(selectLastKnownLocationAddress)
