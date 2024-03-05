import {IconName} from '@/components/ui/media/iconPaths'
import {TestProps} from '@/components/ui/types'

export enum AlertVariant {
  information = 'information',
  negative = 'negative',
  positive = 'positive',
}

export type AlertContent =
  | {
      text: string
      title?: string
    }
  | undefined

export type AlertProps = {
  content: AlertContent
  hasCloseIcon?: boolean
  hasIcon?: boolean
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
