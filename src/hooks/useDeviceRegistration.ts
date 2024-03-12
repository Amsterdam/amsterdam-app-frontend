import {useCallback, useEffect} from 'react'
import {useAppState} from '@/hooks/useAppState'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {Module} from '@/modules/types'

/**
 * Register or undregister the device for push notifications, on start up and on foreground
 */
export const useDeviceRegistration = (enabledModules?: Module[]) => {
  const {registerDeviceWithPermission, unregisterDevice} =
    useRegisterDevice(false)

  const handleDeviceRegistration = useCallback(() => {
    if (!enabledModules) {
      return
    }

    if (
      enabledModules?.some(({requiresFirebaseToken}) => requiresFirebaseToken)
    ) {
      // Because tokens refresh regularly, we need to re-register regularly
      registerDeviceWithPermission()
    } else {
      // When the user has disabled all modules that require a Firebase token, we unregister the device so the user stops receiving push notifications
      void unregisterDevice(undefined)
    }
  }, [enabledModules, registerDeviceWithPermission, unregisterDevice])

  useEffect(handleDeviceRegistration, [handleDeviceRegistration])

  useAppState({onForeground: handleDeviceRegistration})
}
