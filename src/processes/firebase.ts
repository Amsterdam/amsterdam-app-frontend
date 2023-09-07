import messaging from '@react-native-firebase/messaging'
import {
  NotificationSettings,
  NotificationOption,
  requestNotifications,
  checkNotifications,
  PermissionStatus,
  RESULTS,
} from 'react-native-permissions'

type NotificationPermissionResult = {
  settings: NotificationSettings
  status: PermissionStatus
}

/**
 * Determines whether the user has given permission to receive push notifications via FCM.
 * If FCM can't determine the permission status, it will trigger a system dialog to request permissions.
 */
export const getPushNotificationPermission = (
  requestPermission: boolean,
  options: NotificationOption[] = ['alert', 'badge', 'carPlay', 'sound'],
): Promise<NotificationPermissionResult> =>
  requestPermission ? requestNotifications(options) : checkNotifications()

export const getFcmToken = (currentPermissionStatus: PermissionStatus) =>
  currentPermissionStatus === RESULTS.GRANTED
    ? messaging().getToken()
    : undefined
