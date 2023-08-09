import {selectLocation} from '@/modules/address/slice'
import {useAppSelector} from '@/store/hooks'

export const useLocation = () => useAppSelector(selectLocation)
