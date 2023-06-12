import {Permission, PermissionsAndroid, Platform} from 'react-native'
import {useSentry} from '@/hooks'
import {devLog} from '@/processes'

const requestAndroidPermission = async (
  type: Permission,
  title: string,
  message: string,
) => {
  const granted = await PermissionsAndroid.request(type, {
    title,
    message,
    buttonNeutral: 'Vraag het me later',
    buttonNegative: 'Nee',
    buttonPositive: 'Ja',
  })
  devLog(granted, PermissionsAndroid.RESULTS.GRANTED)

  return granted === PermissionsAndroid.RESULTS.GRANTED
}

const useRequestPermission = (
  type: Permission,
  title: string,
  message: string,
) => {
  const {sendSentryErrorLog} = useSentry()

  if (Platform.OS === 'ios') {
    return () => Promise.resolve(true)
  }

  return async () => {
    try {
      return await requestAndroidPermission(type, title, message)
    } catch (error) {
      sendSentryErrorLog('Android: request ', 'useRequestCameraPermission.ts', {
        error,
      })
    }
  }
}

export const useRequestCameraPermission = () =>
  useRequestPermission(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    'Toegang tot je camera',
    'Mag de Amsterdam App toegang to je camera krijgen?',
  )

export const useRequestPhotosPermission = () =>
  useRequestPermission(
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    'Toegang tot je foto’s',
    'Mag de Amsterdam App toegang to je  foto’s krijgen?',
  )

const getAndroidPermissionStatus = (type: Permission) =>
  PermissionsAndroid.check(type)
