import {useSelector} from '@/hooks/redux/useSelector'
import {selectCurrentApiVersion} from '@/modules/parking/slice'

export const useCurrentParkingApiVersion = () =>
  useSelector(selectCurrentApiVersion)
