import {
  type AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'

export const alerts = {
  loginSuccess: {
    text: 'Gelukt! De app herkent je nu als omgevingsmanager voor onderstaande projecten. Tik op het project waarvoor je een bericht wilt plaatsen.',
    testID: 'ConstructionWorkEditorSuccessAlert',
    variant: AlertVariant.information,
  },
  loginFailed: {
    text: 'Helaas, de app heeft je niet herkend als omgevingsmanager. Probeer je opnieuw te registreren om berichten te kunnen versturen.',
    testID: 'ConstructionWorkEditorErrorAlert',
    variant: AlertVariant.negative,
  },
  postMessageSuccess: {
    title: 'Gelukt',
    text: 'Uw bericht is geplaatst.',
    testID: 'ConstructionWorkEditorSendMessageSuccessAlert',
    variant: AlertVariant.positive,
  },
  saveMessageFailed: {
    title: 'Niet gelukt',
    text: 'Het bericht opslaan is niet gelukt. Probeer het nog eens.',
    testID: 'ConstructionWorkEditorSaveMessageErrorAlert',
    variant: AlertVariant.negative,
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
