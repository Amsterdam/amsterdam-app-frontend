import {useSelector} from '@/hooks/redux/useSelector'
import {selectLocationType} from '@/modules/waste-guide/slice'

export const useLocationType = () => useSelector(selectLocationType)
