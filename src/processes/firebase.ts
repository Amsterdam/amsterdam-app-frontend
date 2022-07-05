import messaging from '@react-native-firebase/messaging'
import {devLog} from '@/processes'

export enum Permission {
  denied,
  granted,
  undetermined,
}

const mapPermissionStatus = (fcmAuthStatus: number): Permission => {
  switch (fcmAuthStatus) {
    case 0:
      return Permission.denied
    case 1:
    case 2:
      return Permission.granted
    case -1:
    default:
      return Permission.undetermined
  }
}

/**
 * Determines whether the user has given permission to receive push notifications via FCM.
 * If FCM can't determine the permission status, it will trigger a system dialog to request permissions.
 */
export const requestPushNotificationsPermission = async () => {
  const authStatus = await messaging().requestPermission()
  return mapPermissionStatus(authStatus)
}

export const getPushNotificationsPermission = async () => {
  const authStatus = await messaging().hasPermission()
  return mapPermissionStatus(authStatus)
}

export const getFcmToken = (currentPermissionStatus: Permission) => {
  if (currentPermissionStatus === Permission.granted) {
    try {
      return messaging().getToken()
    } catch (error) {
      devLog(error)
    }
  }
}
