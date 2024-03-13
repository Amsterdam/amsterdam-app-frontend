import {useEffect} from 'react'
import {useUpdatePermission} from '@/hooks/permissions/useUpdatePermission'
import {useAppState} from '@/hooks/useAppState'
import {setHasLocationPermission} from '@/store/slices/permissions'
import {PERMISSION_LOCATION} from '@/utils/permissions/permissionsForPlatform'

const useUpdateLocationPermission = (request = false, silent = true) =>
  useUpdatePermission(
    PERMISSION_LOCATION,
    setHasLocationPermission,
    request,
    silent,
  )

/**
 * Returns a function to request the location permission and save it to the redux state.
 */
export const useRequestLocationPermissionCallback = () =>
  useUpdateLocationPermission(true)

/**
 * Requests the location permission on foreground and saves it to the redux state.
 */
export const useRequestLocationPermissionOnForeground = () => {
  const updatePermission = useUpdateLocationPermission(true, true)

  useAppState({
    onForeground: updatePermission,
  })
}

/**
 * Checks the location permission on start up and on foreground and saves it to the redux state.
 */
export const useCheckLocationPermission = () => {
  const updatePermission = useUpdateLocationPermission(false, true)

  useEffect(() => {
    void updatePermission()
  }, [updatePermission])

  useAppState({
    onForeground: updatePermission,
  })
}
