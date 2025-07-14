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
  text?: string | ReactNode
  title?: string
  variant?: AlertVariant
} & TestProps

export type AlertsRecord = Record<
  `${string}${'Warning' | 'Success' | 'Failed' | 'Info'}`,
  AlertProps
>
