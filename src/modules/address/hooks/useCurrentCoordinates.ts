import {useSelector} from '@/hooks/redux/useSelector'
import {selectCurrentCoordinates} from '@/modules/address/slice'

export const useCurrentCoordinates = () => useSelector(selectCurrentCoordinates)
