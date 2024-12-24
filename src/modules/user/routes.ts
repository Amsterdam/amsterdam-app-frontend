export enum UserRouteName {
  moduleSettings = 'ModuleSettings',
  user = 'User',
  userBiometrics = 'UserBiometrics',
}

export type UserStackParams = {
  [UserRouteName.moduleSettings]: undefined
  [UserRouteName.user]: undefined
  [UserRouteName.userBiometrics]: undefined
}

export enum UserModalName {}

export type UserModalParams = Record<string, never>
