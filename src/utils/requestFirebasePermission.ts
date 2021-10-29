import messaging from '@react-native-firebase/messaging'

export const requestFirebasePermission = async () => {
  await messaging().requestPermission()
  return messaging.AuthorizationStatus
}
