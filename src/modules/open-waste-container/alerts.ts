import {
  type AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'

export const alerts = {
  bluetoothPermissionSuccess: {
    hasCloseIcon: true,
    title: 'Bluetooth toegang verleend',
    text: 'Druk op de knop om de afvalpas toe te voegen.',
    testID: 'BluetoothPermissionSuccessAlert',
    variant: AlertVariant.positive,
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
