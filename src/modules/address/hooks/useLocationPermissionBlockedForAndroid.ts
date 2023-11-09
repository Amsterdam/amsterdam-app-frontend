import {useSelector} from '@/hooks/redux/useSelector'
import {selectLocationPermissionBlockedForAndroid} from '@/modules/address/slice'

export const useLocationPermissionBlockedForAndroid = () =>
  useSelector(selectLocationPermissionBlockedForAndroid)
