export enum UserRouteName {
  user = 'User',
}

export type UserStackParams = {
  [UserRouteName.user]: undefined
}

export enum UserModalName {}

export type UserModalParams = Record<string, never>
