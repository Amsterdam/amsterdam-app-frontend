import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Permissions} from '@/types/permissions'

export type PermissionInstructionScreenParams = {
  icon: SvgIconName
  paragraph: string
  permission: Permissions
  screenTitle: string
  title: string
}
