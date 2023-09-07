import {useCallback, useEffect, useRef, useState} from 'react'
import {
  AndroidPermission,
  check,
  IOSPermission,
  PermissionStatus,
  Rationale,
  request,
} from 'react-native-permissions'
import {useAppState} from '@/hooks/useAppState'

type UsePermissionParams = {
  permission: AndroidPermission | IOSPermission
  rationale?: Rationale
  requestPermission?: boolean
}

const permissionFn = (
  permission: AndroidPermission | IOSPermission,
  requestPermission?: boolean,
  rationale?: Rationale,
) => (requestPermission ? request(permission, rationale) : check(permission))

export const usePermission = ({
  permission,
  requestPermission = false,
  rationale,
}: UsePermissionParams) => {
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
