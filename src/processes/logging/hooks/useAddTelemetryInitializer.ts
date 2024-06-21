import {ITelemetryItem} from '@microsoft/applicationinsights-web'
import {useCallback, useEffect} from 'react'
import {Platform} from 'react-native'
import {isEmulator as isEmulatorDeviceInfo} from 'react-native-device-info'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAppInsights} from '@/processes/logging/hooks/useAppInsights'
import {selectEnvironment} from '@/store/slices/environment'
import {selectPermissions} from '@/store/slices/permissions'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'

export const useAddTelemetryInitializer = () => {
  const {addTelemetryInitializer: addTelemetryInitializerAI} = useAppInsights()
  const {environment} = useSelector(selectEnvironment)
  const permissions = useSelector(selectPermissions)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  const addTelemetryInitializer = useCallback(async () => {
    const isEmulator = await isEmulatorDeviceInfo()

    const telemetryInitializer = (envelope: ITelemetryItem) => {
      if (!envelope.data) {
        envelope.data = {}
      }

      envelope.data.deviceId = SHA256EncryptedDeviceId
      envelope.data.isEmulator = isEmulator
      envelope.data.os = Platform.OS
      envelope.data.osVersion = Platform.Version
      envelope.data.environment = environment
      envelope.data.permissions = permissions
      envelope.data.isScreenReaderEnabled = isScreenReaderEnabled
    }

    addTelemetryInitializerAI(telemetryInitializer)
  }, [
    addTelemetryInitializerAI,
    environment,
    isScreenReaderEnabled,
    permissions,
  ])

  useEffect(() => {
    void addTelemetryInitializer()
  }, [addTelemetryInitializer])
}
