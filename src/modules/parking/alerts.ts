import {
  type AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'

export const alerts = {
  maxLicensePlatesInfo: {
    variant: AlertVariant.information,
    text: 'Er kunnen niet meer dan 9 kentekens worden opgeslagen.',
    title: 'Maximum aantal kentekens',
    hasIcon: true,
    hasCloseIcon: false,
    testID: 'ParkingMaxLicensePlatesAlert',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
