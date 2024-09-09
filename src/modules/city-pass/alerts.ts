import {
  type AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'

export const alerts = {
  logoutWarning: {
    variant: AlertVariant.warning,
    text: 'Je Stadspas gegevens zijn niet meer zichtbaar in de app. Je kunt je Stadspas gegevens altijd weer zien door in te loggen.',
    title: 'Uitgelogd',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'CityPassLoggedOutAlert',
  },
  logoutSuccess: {
    variant: AlertVariant.positive,
    text: 'Je Stadspas gegevens zijn niet meer zichtbaar in de app. Je kunt je Stadspas gegevens altijd weer zien door in te loggen.',
    title: 'Uitgelogd',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'CityPassLoggedOutAlert',
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
  loginSuccess: {
    variant: AlertVariant.positive,
    text: 'Je Stadspas staat nu ook in de app.',
    title: 'Gelukt!',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'CityPassLoggedInAlertPositive',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
