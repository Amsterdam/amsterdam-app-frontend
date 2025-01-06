import {PermissionInstructionScreenParams} from '@/modules/home/types'

export enum HomeRouteName {
  admin = 'Admin',
  home = 'Home',
}

export type HomeStackParams = {
  [HomeRouteName.admin]: undefined
  [HomeRouteName.home]: undefined
}

export enum HomeModalName {
  permissionInstructions = 'PermissionInstructions',
}

export type HomeModalParams = {
  [HomeModalName.permissionInstructions]: PermissionInstructionScreenParams
}
