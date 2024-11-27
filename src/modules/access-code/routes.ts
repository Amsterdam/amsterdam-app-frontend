export enum AccessCodeRouteName {
  confirmAccessCode = 'ConfirmAccessCode',
  setAccessCode = 'SetAccessCode',
}

export type AccessCodeStackParams = {
  [AccessCodeRouteName.setAccessCode]: undefined
  [AccessCodeRouteName.confirmAccessCode]: undefined
}

export enum AccessCodeModalName {
  accessCode = 'AccessCode',
}

export type AccessCodeModalParams = {
  [AccessCodeModalName.accessCode]: undefined
}
