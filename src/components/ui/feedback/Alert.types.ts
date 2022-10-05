import {FC} from 'react'
import {SvgProps} from '@/types'

export enum AlertCloseType {
  withButton = 'withButton',
  withoutButton = 'withoutButton',
}

export enum AlertVariant {
  default = 'default',
  failure = 'failure',
  success = 'success',
}

export type AlertVariantConfig = {
  [v in AlertVariant]: {
    backgroundColor: string
    borderColor: string
    borderWidth: number
    icon: FC<SvgProps>
  }
}
