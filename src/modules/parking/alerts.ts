import {
  type AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'

export const alerts = {
  maxLicensePlatesWarning: {
    variant: AlertVariant.warning,
    text: `Er kunnen niet meer dan ${MAX_LICENSE_PLATES} kentekens worden opgeslagen.`,
    title: 'Maximum aantal kentekens',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'ParkingMaxLicensePlatesAlert',
  },
  increaseBalanceSuccess: {
    variant: AlertVariant.positive,
    text: 'Geldsaldo is succesvol verhoogd.',
    title: 'Gelukt',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'ParkingIncreaseBalanceSuccessAlert',
  },
  increaseBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'Geldsaldo verhogen is mislukt, probeer het nog een keer.',
    title: 'Mislukt',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'ParkingIncreaseBalanceFailedAlert',
  },
  notEnoughTimeBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'Te weinig tijd om parkeersessie te starten.',
    title: 'Niet genoeg tijdsaldo',
    hasIcon: true,
    hasCloseIcon: false,
    testID: 'ParkingIncreaseBalanceFailedAlert',
  },
  notEnoughMoneyBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'Te weinig geld om parkeersessie te starten.',
    title: 'Niet genoeg geldsaldo',
    hasIcon: true,
    hasCloseIcon: false,
    testID: 'ParkingIncreaseBalanceFailedAlert',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
