import {useSelector} from '@/hooks/redux/useSelector'
import {selectLastKnownCoordinates} from '@/modules/address/slice'

export const useLastKnownCoordinates = () =>
  useSelector(selectLastKnownCoordinates)
