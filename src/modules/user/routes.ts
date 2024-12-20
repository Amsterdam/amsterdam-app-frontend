export enum UserRouteName {
  user = 'User',
  userBiometrics = 'UserBiometrics',
}

export type UserStackParams = {
  [UserRouteName.user]: undefined
  [UserRouteName.userBiometrics]: undefined
}

export enum UserModalName {}

export type UserModalParams = Record<string, never>
