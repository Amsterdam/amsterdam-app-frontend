import {useCallback, useEffect} from 'react'
import {useAppState} from '@/hooks/useAppState'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {Module} from '@/modules/types'

/**
 * Register or unregister the device for push notifications, on start up and on foreground and on module enable/disable
 */
export const useDeviceRegistration = (enabledModules?: Module[]) => {
  const {registerDeviceIfPermitted, unregisterDevice} = useRegisterDevice()

  const isAnyFirebaseModuleEnabled = enabledModules?.some(
    ({requiresFirebaseToken}) => requiresFirebaseToken,
  )

  const handleDeviceRegistration = useCallback(() => {
    if (isAnyFirebaseModuleEnabled) {
      // Because tokens refresh regularly, we need to re-register regularly
      void registerDeviceIfPermitted()
    } else {
      // When the user has disabled all modules that require a Firebase token, we unregister the device so the user stops receiving push notifications
      void unregisterDevice(undefined)
    }
  }, [isAnyFirebaseModuleEnabled, registerDeviceIfPermitted, unregisterDevice])

  useEffect(handleDeviceRegistration, [handleDeviceRegistration])

  useAppState({onForeground: handleDeviceRegistration})
}
