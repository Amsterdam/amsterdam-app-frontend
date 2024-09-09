import {
  type AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'

export const alerts = {
  addAddressSuccess: {
    title: 'Gelukt',
    text: 'Het adres is toegevoegd aan uw profiel.',
    testID: 'AddressAddedAlert',
    variant: AlertVariant.positive,
  },
  deleteAddressSuccess: {
    title: 'Gelukt',
    text: 'Het adres is verwijderd uit uw profiel.',
    testID: 'AddressDeletedAlert',
    variant: AlertVariant.positive,
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
