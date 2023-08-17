import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'

export const requestLocationFailedAlertConfig = {
  testID: 'RequestLocationFailedAlert',
  closeType: AlertCloseType.withoutButton,
  content: {
    text: 'Het is niet gelukt uw locatie op te vragen.',
    title: 'Opvragen locatie mislukt',
  },
  variant: AlertVariant.negative,
  withIcon: false,
}
