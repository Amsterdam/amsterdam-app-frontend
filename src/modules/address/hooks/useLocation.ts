import {useSelector} from '@/hooks/redux/useSelector'
import {selectLocation} from '@/modules/address/slice'

export const useLocation = () => useSelector(selectLocation)
