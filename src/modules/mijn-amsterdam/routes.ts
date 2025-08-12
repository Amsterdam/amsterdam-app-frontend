import {LoginResult} from '@/types/navigation'

export enum MijnAmsterdamRouteName {
  settings = 'Settings',
}

export type MijnAmsterdamStackParams = {
  [MijnAmsterdamRouteName.settings]: {loginResult: LoginResult} | undefined
}
