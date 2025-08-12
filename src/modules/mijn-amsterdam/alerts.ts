import {
  AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'

export const alerts = {
  loginSuccess: {
    variant: AlertVariant.positive,
    text: 'U ontvangt nu meldingen van Mijn Amsterdam.',
    title: 'Inloggen gelukt',
    hasIcon: true,
    testID: 'MijnAmsterdamLoginSuccessAlert',
  },
  loginFailed: {
    variant: AlertVariant.negative,
    text: 'Inloggen is mislukt. Controleer uw gegevens en probeer het opnieuw.',
    title: 'Inloggen mislukt',
    hasIcon: true,
    testID: 'MijnAmsterdamLoginFailedAlert',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
