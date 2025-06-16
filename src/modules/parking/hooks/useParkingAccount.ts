import {useSelector} from '@/hooks/redux/useSelector'
import {selectParkingAccount} from '@/modules/parking/slice'

export const useParkingAccount = () => useSelector(selectParkingAccount)
