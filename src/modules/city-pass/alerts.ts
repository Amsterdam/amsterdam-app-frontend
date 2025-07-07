import {
  type AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'

const LOGOUT_ALERT = {
  text: 'Je Stadspas gegevens zijn niet meer zichtbaar in de app. Je kunt je Stadspas gegevens altijd weer zien door in te loggen.',
  title: 'Uitgelogd',
  hasIcon: true,
  hasCloseIcon: true,
  testID: 'CityPassLoggedOutAlert' as const,
}

export const alerts = {
  automaticLogoutInfo: {
    variant: AlertVariant.information,
    title: 'Automatisch uitgelogd',
    text: 'Op 31 juli loggen we je automatisch uit. Dit is nodig om je gegevens veilig te houden.',
    hasCloseIcon: true,
    testID: 'CityPassAutomaticLogoutAlert',
  },
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
    testID: 'CityPassLoggedInNegativeAlert',
  },
  noPassesInfo: {
    variant: AlertVariant.information,
    text: 'De Stadspas is voor Amsterdammers met een laag inkomen en weinig vermogen.',
    title: 'U hebt geen Stadspas',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'CityPassNoPassesInformationAlert',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
