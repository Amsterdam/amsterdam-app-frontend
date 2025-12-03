import {
  AlertVariant,
  type AlertsRecord,
} from '@/components/ui/feedback/alert/Alert.types'

export const alerts = {
  feedbackSuccess: {
    variant: AlertVariant.positive,
    title: 'Bedankt',
    text: 'Feedback is verstuurd.',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'SurveyFeedbackFormSuccessAlert',
  },
  feedbackFailed: {
    variant: AlertVariant.negative,
    title: 'Sorry...',
    text: 'Feedback sturen is mislukt. Probeer het later nog een keer.',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'SurveyFeedbackFormFailedAlert',
  },
} as const satisfies AlertsRecord
