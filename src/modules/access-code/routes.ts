export enum AccessCodeRouteName {
  accessCodeLogin = 'AccessCodeLogin',
  confirmAccessCode = 'ConfirmAccessCode',
  setAccessCode = 'SetAccessCode',
  validAccessCode = 'ValidAccessCode',
}

export type AccessCodeStackParams = {
  [AccessCodeRouteName.accessCodeLogin]: undefined
  [AccessCodeRouteName.setAccessCode]: undefined
  [AccessCodeRouteName.confirmAccessCode]: undefined
  [AccessCodeRouteName.validAccessCode]: undefined
}

export enum AccessCodeModalName {
  accessCode = 'AccessCode',
  accessCodeInvalid = 'AccessCodeInvalid',
}

export type AccessCodeModalParams = {
  [AccessCodeModalName.accessCode]: undefined
  [AccessCodeModalName.accessCodeInvalid]: undefined
}
