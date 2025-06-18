import {
  type AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'

export const alerts = {
  changePincodeSuccess: {
    variant: AlertVariant.positive,
    text: 'Pincode verstuurd als deze meldcode bestaat.',
    hasIcon: true,
    testID: 'ParkingChangePincodeSuccessAlert',
  },
  decreaseTimeBalanceSuccess: {
    variant: AlertVariant.positive,
    text: 'Tijdsaldo is succesvol verlaagd.',
    title: 'Gelukt',
    hasIcon: true,
    testID: 'ParkingManageVisitorDecreaseTimeBalanceSuccessAlert',
  },
  decreaseTimeBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'Tijdsaldo verlagen is mislukt, probeer het nog een keer.',
    title: 'Mislukt',
    hasIcon: true,
    testID: 'ParkingManageVisitorDecreaseTimeBalanceFailedAlert',
  },
  increaseBalanceSuccess: {
    variant: AlertVariant.positive,
    text: 'Geldsaldo is verhoogd. Het kan even duren voordat het saldo is bijgewerkt.',
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
  adjustTimeBalanceSuccess: {
    variant: AlertVariant.positive,
    text: 'Tijdsaldo is aangepast.',
    title: 'Gelukt',
    hasIcon: true,
    testID: 'ParkingManageVisitorAdjustTimeBalanceSuccessAlert',
  },
  adjustTimeBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'We konden het tijdsaldo niet aanpassen.',
    title: 'Mislukt',
    hasIcon: true,
    testID: 'ParkingManageVisitorAdjustTimeBalanceFailedAlert',
  },
  maxLicensePlatesWarning: {
    variant: AlertVariant.warning,
    text: `Er kunnen niet meer dan ${MAX_LICENSE_PLATES} kentekens worden opgeslagen.`,
    title: 'Maximum aantal kentekens',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'ParkingMaxLicensePlatesAlert',
  },
  maximumSessionsWarning: {
    variant: AlertVariant.warning,
    text: 'Pas de parkeertijd aan.',
    title: 'Maximum aantal parkeersessies bereikt',
    hasIcon: true,
    testID: 'ParkingMaximumSessionsWarningAlert',
  },
  insufficientTimeBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'Te weinig tijd om parkeersessie te starten.',
    title: 'Niet genoeg tijdsaldo',
    hasIcon: true,
    hasCloseIcon: false,
    testID: 'ParkingInsufficientTimeBalanceFailedAlert',
  },
  insufficientMoneyBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'Te weinig geld om parkeersessie te starten.',
    title: 'Niet genoeg geldsaldo',
    hasIcon: true,
    hasCloseIcon: false,
    testID: 'ParkingInsufficientMoneyBalanceFailedAlert',
  },
  startSessionSuccess: {
    variant: AlertVariant.positive,
    title: 'Uw parkeersessie is opgeslagen',
    hasCloseIcon: true,
    hasIcon: true,
    testID: 'ParkingStartSessionSuccessAlert',
  },
  accountPinCodeChangeSuccess: {
    variant: AlertVariant.positive,
    title: 'Uw pincode is gewijzigd.',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'ParkingAccountPinCodeChangeSuccessAlert',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
