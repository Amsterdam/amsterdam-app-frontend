import messaging from '@react-native-firebase/messaging'

enum Permission {
  Denied,
  Granted,
  Undetermined,
}

const mapPermissionStatus = (fcmAuthStatus: number): Permission | undefined => {
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

export const getFCMToken = async () => {
  const permissionStatus = await requestPermission()
  if (permissionStatus === Permission.Granted) {
    try {
      const token = await messaging().getToken()
      return token
    } catch (error) {
      console.log(error)
    }
  }
}
