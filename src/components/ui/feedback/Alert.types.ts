import {IconName} from '@/components/ui/media'

export enum AlertCloseType {
  withButton = 'withButton',
  withoutButton = 'withoutButton',
}

export enum AlertVariant {
  information = 'information',
  negative = 'negative',
  positive = 'positive',
}

export type AlertVariantConfig = {
  [v in AlertVariant]: {
    backgroundColor: string
    borderColor: string
    borderWidth: number
    iconName: IconName
  }
}
