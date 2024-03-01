import {useSelector} from '@/hooks/redux/useSelector'
import {selectLocationType} from '@/modules/address/slice'

export const useLocationType = () => useSelector(selectLocationType)
