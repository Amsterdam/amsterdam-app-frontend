import {useCallback, useEffect, useRef, useState} from 'react'
import {Platform} from 'react-native'
import {
  PermissionStatus,
  check,
  request,
  Permission,
  Rationale,
  IOSPermission,
  AndroidPermission,
} from 'react-native-permissions'
import {useAppState} from '@/hooks/useAppState'

const permissionFn = (
  permission: Permission,
  requestPermission: boolean,
  rationale?: Rationale | undefined,
): Promise<PermissionStatus> =>
  requestPermission ? request(permission, rationale) : check(permission)

export const usePermission = ({
  permissionAndroid,
  permissionIOS,
  requestPermission = false,
  rationale,
}: {
  permissionAndroid: AndroidPermission
  permissionIOS: IOSPermission
  rationale?: Rationale
  requestPermission?: boolean
}): {
  promise: Promise<PermissionStatus | undefined>
  status: PermissionStatus | undefined
} => {
  const permission =
    Platform.OS === 'android' ? permissionAndroid : permissionIOS
  const [status, setStatus] = useState<PermissionStatus | undefined>()
  const currentPromise = useRef<Promise<PermissionStatus | undefined>>(
    Promise.resolve(undefined),
  )
  const checkPermission = useCallback(() => {
    currentPromise.current = permissionFn(
      permission,
      requestPermission,
      rationale,
    )
    currentPromise.current.then(
      value => {
        setStatus(value)
      },
      () => {
        setStatus(undefined)
      },
    )
  }, [permission, requestPermission, rationale])

  useAppState({
    onForeground: checkPermission,
  })

  useEffect(checkPermission, [checkPermission])

  return {status, promise: currentPromise.current}
}
