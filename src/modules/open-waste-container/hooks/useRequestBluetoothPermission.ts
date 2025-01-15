import {useCallback} from 'react'
import {Platform} from 'react-native'
import {usePermission} from '@/hooks/permissions/usePermission'
import {Permissions} from '@/types/permissions'

export const useRequestBluetoothPermission = () => {
  const {requestPermission: requestBluetoothPermission} = usePermission(
    Permissions.bluetooth,
  )
  const {requestPermission: requestBluetoothConnectPermissionAndroid} =
    usePermission(Permissions.bluetoothConnect)

  return useCallback(async () => {
    try {
      const bluetoothScanPermission = await requestBluetoothPermission()
      const bluetoothConnectPermission =
        await requestBluetoothConnectPermissionAndroid()

      return Platform.OS === 'android'
        ? bluetoothScanPermission && bluetoothConnectPermission
        : bluetoothScanPermission
    } catch (error) {
      return false
    }
  }, [requestBluetoothConnectPermissionAndroid, requestBluetoothPermission])
}
