import messaging from '@react-native-firebase/messaging'
import {devLog} from '@/processes'

export enum Permission {
  Denied,
  Granted,
  Undetermined,
}

export const mapPermissionStatus = (
  fcmAuthStatus: number,
): Permission | undefined => {
  switch (fcmAuthStatus) {
    case -1:
      return Permission.Undetermined
    case 0:
      return Permission.Denied
    case 1:
    case 2:
      return Permission.Granted
    default:
      return undefined
  }
}

const requestPermission = async () => {
  const authStatus = await messaging().requestPermission()
  return mapPermissionStatus(authStatus)
}

export const getFcmToken = async () => {
  const permissionStatus = await requestPermission()
  if (permissionStatus === Permission.Granted) {
    try {
      const token = await messaging().getToken()
      return token
    } catch (error) {
      devLog(error)
    }
  }
}
