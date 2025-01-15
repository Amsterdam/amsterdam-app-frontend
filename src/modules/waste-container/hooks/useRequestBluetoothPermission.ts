import {useCallback} from 'react'
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

      return bluetoothScanPermission && bluetoothConnectPermission
    } catch (error) {
      return false
    }
  }, [requestBluetoothConnectPermissionAndroid, requestBluetoothPermission])
}
