import {useSelector} from '@/hooks/redux/useSelector'
import {useMemoizedCoordinates} from '@/modules/address/hooks/useMemoizedCoordinates'
import {selectLastKnownCoordinates} from '@/modules/address/slice'

export const useLastKnownCoordinates = () =>
  useMemoizedCoordinates(useSelector(selectLastKnownCoordinates))
