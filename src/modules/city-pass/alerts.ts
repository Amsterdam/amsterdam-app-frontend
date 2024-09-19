import {
  type AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'

const LOGOUT_ALERT = {
  text: 'Je Stadspas gegevens zijn niet meer zichtbaar in de app. Je kunt je Stadspas gegevens altijd weer zien door in te loggen.',
  title: 'Uitgelogd',
  hasIcon: true,
  hasCloseIcon: true,
  testID: 'CityPassLoggedOutAlert',
}

export const alerts = {
  logoutWarning: {
    variant: AlertVariant.warning,
    ...LOGOUT_ALERT,
  },
  logoutSuccess: {
    variant: AlertVariant.positive,
    ...LOGOUT_ALERT,
  },
  logoutFailed: {
    variant: AlertVariant.negative,
    text: 'Er is iets misgegaan. Probeer het opnieuw.',
    title: 'Uitloggen mislukt',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'CityPassLogoutFailedAlert',
  },
  retrievePassesFailed: {
    variant: AlertVariant.negative,
    text: 'Er ging iets fout bij het ophalen van de Stadspas gegevens. Probeer het later nog eens.',
    title: 'Inloggen mislukt',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'CityPassLoggedInAlertNegative',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
