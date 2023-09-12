import {PermissionStatus, RESULTS} from 'react-native-permissions'
import {getPropertyFromMaybeError} from '@/utils/object'

const permissionErrorStatuses = Object.values(RESULTS).filter(
  result => result !== RESULTS.GRANTED,
)

export const isPermissionErrorStatus = (maybePermissionStatus?: unknown) =>
  typeof maybePermissionStatus === 'string' &&
  permissionErrorStatuses.includes(maybePermissionStatus as PermissionStatus)

export const getStatusFromError = (error: unknown) => {
  const message = getPropertyFromMaybeError<string>(error, 'message')

  if (!isPermissionErrorStatus(message)) {
    return
  }

  return message as PermissionStatus
}
