import {ReactNode} from 'react'
import {TestProps} from '@/components/ui/types'

export enum AlertVariant {
  information = 'information',
  negative = 'negative',
  positive = 'positive',
  warning = 'warning',
}

export type AlertProps = {
  children?: ReactNode
  hasCloseIcon?: boolean
  hasIcon?: boolean
  text?: string
  title?: string
  variant?: AlertVariant
} & TestProps
