import messaging from '@react-native-firebase/messaging'

type PermissionStatus = 'undetermined' | 'granted' | 'denied'

const mapPermissionStatus = (
  fcmAuthStatus: number,
): PermissionStatus | undefined => {
  switch (fcmAuthStatus) {
    case -1:
      return 'undetermined'
    case 0:
      return 'denied'
    case 1:
    case 2:
      return 'granted'
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
  if (permissionStatus === 'granted') {
    try {
      const token = await messaging().getToken()
      return token
    } catch (error) {
      console.log(error)
    }
  }
}
