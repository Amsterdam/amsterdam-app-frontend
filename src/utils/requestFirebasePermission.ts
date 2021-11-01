import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'

export const mapNumberToAuthorizationStatus = (number: number): string => {
  switch (number) {
    case -1:
      return 'NOT_DETERMINED'
    case 0:
      return 'DENIED'
    case 1:
      return 'AUTHORIZED'
    case 2:
      return 'PROVISIONAL'
    default:
      return 'Not found'
  }
}

export const requestFirebasePermission = async (): Promise<
  number | unknown
> => {
  try {
    const authStatus = await messaging().requestPermission()
    return authStatus
  } catch (error) {
    return error
  }
}

export const requestAndStoreFirebasePermission = async (): Promise<
  void | unknown
> => {
  try {
    const status = await requestFirebasePermission()
    AsyncStorage.setItem('firebase', JSON.stringify({permissionStatus: status}))
  } catch (error) {
    return error
  }
}
