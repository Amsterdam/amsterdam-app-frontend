import {Theme} from '@/themes/themes'

export type PopupMenuItem = {
  color: keyof Theme['color']['text']
  label: string
  onPress: () => void
  testID: string
}

export enum PopupMenuOrientation {
  left = 'left',
  right = 'right',
}
