export enum UserRouteName {
  moduleSettings = 'ModuleSettings',
  notificationSettings = 'NotificationSettings',
  user = 'User',
  userBiometrics = 'UserBiometrics',
}

export type UserStackParams = {
  [UserRouteName.moduleSettings]: undefined
  [UserRouteName.notificationSettings]: undefined
  [UserRouteName.user]: undefined
  [UserRouteName.userBiometrics]: undefined
}

export enum UserModalName {}

export type UserModalParams = Record<string, never>
