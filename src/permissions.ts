import {PERMISSIONS} from 'react-native-permissions'

export const locationPermissionByPlatform = {
  permissionAndroid: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  permissionIOS: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
}
