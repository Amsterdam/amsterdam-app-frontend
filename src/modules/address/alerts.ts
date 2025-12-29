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
  saveMyAddressSuccess: {
    variant: AlertVariant.positive,
    title: 'Gelukt',
    text: 'Uw adres is opgeslagen als Mijn adres',
    testID: 'AddressSaveMyAddressSuccessAlert',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
