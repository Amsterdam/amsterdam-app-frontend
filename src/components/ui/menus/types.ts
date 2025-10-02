import {TestProps} from '@/components/ui/types'
import {Theme} from '@/themes/themes'

export type PopupMenuItem = {
  color: keyof Theme['color']['text']
  id?: string
  label: string
  onPress: () => void
} & TestProps

export enum PopupMenuOrientation {
  left = 'left',
  right = 'right',
}
