import {Platform} from 'react-native'
import {RESULTS as permissionStatuses} from 'react-native-permissions'
import {usePermission} from '@/hooks/usePermission'
import {useNoLocationPermissionForAndroid} from '@/modules/address/slice'
import {PERMISSION_LOCATION} from '@/utils/permissions/permissionsForPlatform'

export const useLocationPermission = () => {
  const noLocationPermissionForAndroid = useNoLocationPermissionForAndroid()
  const {status: locationPermissionStatus} = usePermission({
    permission: PERMISSION_LOCATION,
  })

  if (Platform.OS === 'android') {
    return noLocationPermissionForAndroid === false
  }

  return locationPermissionStatus !== permissionStatuses.BLOCKED
}
