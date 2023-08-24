import {Platform} from 'react-native'
import {AndroidPermission, IOSPermission} from 'react-native-permissions'

export const getPermissionForPlatform = (
  permissionAndroid: AndroidPermission,
  permissionIOS: IOSPermission,
) => (Platform.OS === 'android' ? permissionAndroid : permissionIOS)
