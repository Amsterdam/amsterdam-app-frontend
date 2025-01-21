import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Permissions} from '@/types/permissions'

export enum IconComponentName {
  bluetooth = 'bluetooth',
}

export type PermissionInstructionScreenParams = {
  iconComponentName?: IconComponentName
  iconName?: SvgIconName
  paragraph: string
  permission: Permissions
  screenTitle: string
  title: string
}
