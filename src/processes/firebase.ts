import messaging from '@react-native-firebase/messaging'
import {devLog} from '@/processes'

export enum Permission {
  Denied,
  Granted,
  Undetermined,
}

export const mapPermissionStatus = (fcmAuthStatus: number): Permission => {
  switch (fcmAuthStatus) {
    case 0:
      return Permission.Denied
    case 1:
    case 2:
      return Permission.Granted
    case -1:
    default:
      return Permission.Undetermined
  }
}

export const requestPermission = async () => {
  const authStatus = await messaging().requestPermission()
  return mapPermissionStatus(authStatus)
}

export const getPermission = async () => {
  const authStatus = await messaging().hasPermission()
  return mapPermissionStatus(authStatus)
}

export const getFcmToken = (permissionStatus?: Permission) => {
  if (permissionStatus === Permission.Granted) {
    try {
      return messaging().getToken()
    } catch (error) {
      devLog(error)
    }
  }
}
