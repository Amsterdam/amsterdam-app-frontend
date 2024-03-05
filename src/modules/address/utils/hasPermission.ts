import {Platform} from 'react-native'
import {
  PermissionStatus,
  RESULTS as permissionStatuses,
} from 'react-native-permissions'

export const hasPermission = (
  noLocationPermissionForAndroid = false,
  locationPermissionStatus?: PermissionStatus,
) => {
  if (Platform.OS === 'android') {
    return noLocationPermissionForAndroid === false
  }

  return locationPermissionStatus !== permissionStatuses.BLOCKED
}
