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

export enum HomeModalName {}

// eslint-disable-next-line @typescript-eslint/ban-types
export type HomeModalParams = {}
