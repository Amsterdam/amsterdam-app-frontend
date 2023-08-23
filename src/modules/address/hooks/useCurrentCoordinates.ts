import {useSelector} from '@/hooks/redux/useSelector'
import {useMemoizedCoordinates} from '@/modules/address/hooks/useMemoizedCoordinates'
import {selectCurrentCoordinates} from '@/modules/address/slice'

export const useCurrentCoordinates = () =>
  useMemoizedCoordinates(useSelector(selectCurrentCoordinates))
