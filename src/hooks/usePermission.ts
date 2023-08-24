import {useCallback, useEffect, useRef, useState} from 'react'
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
import {getPermissionForPlatform} from '@/utils/permissions'

type UsePermissionParams = {
  permissionAndroid: AndroidPermission
  permissionIOS: IOSPermission
  rationale?: Rationale
  requestPermission?: boolean
}

const permissionFn = (
  permission: Permission,
  requestPermission?: boolean,
  rationale?: Rationale,
) => (requestPermission ? request(permission, rationale) : check(permission))

export const usePermission = ({
  permissionAndroid,
  permissionIOS,
  requestPermission = false,
  rationale,
}: UsePermissionParams) => {
  const permission = getPermissionForPlatform(permissionAndroid, permissionIOS)
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

  return {promise: currentPromise.current, status}
}
