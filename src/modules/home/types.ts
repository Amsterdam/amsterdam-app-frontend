import {type ElementType} from 'react'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Permissions} from '@/types/permissions'

export type PermissionInstructionScreenParams = {
  IconComponent?: ElementType
  iconName?: SvgIconName
  paragraph: string
  permission: Permissions
  screenTitle: string
  title: string
}
