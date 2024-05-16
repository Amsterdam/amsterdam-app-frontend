import {PermissionInstructionScreenParams} from '@/modules/home/types'

export enum HomeRouteName {
  admin = 'Admin',
  home = 'Home',
  settings = 'Settings',
}

export type HomeStackParams = {
  [HomeRouteName.admin]: undefined
  [HomeRouteName.home]: undefined
  [HomeRouteName.settings]: undefined
}

export enum HomeModalName {
  permissionInstructions = 'PermissionInstructions',
}

export type HomeModalParams = {
  [HomeModalName.permissionInstructions]: PermissionInstructionScreenParams
}
