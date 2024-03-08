import {IconName} from '@/components/ui/media/iconPaths'
import {TestProps} from '@/components/ui/types'

export enum AlertVariant {
  information = 'information',
  negative = 'negative',
  positive = 'positive',
}

export type AlertProps = {
  hasCloseIcon?: boolean
  hasIcon?: boolean
  text: string
  title?: string
  variant?: AlertVariant
} & TestProps

export type AlertVariantConfig = {
  [v in AlertVariant]: {
    backgroundColor: string
    borderColor: string
    borderWidth: number
    iconName: IconName
  }
}
