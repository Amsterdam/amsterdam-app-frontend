export enum AccessCodeRouteName {
  accessCode = 'AccessCode',
  accessCodeInvalid = 'AccessCodeInvalid',
  accessCodeLogin = 'AccessCodeLogin',
  confirmAccessCode = 'ConfirmAccessCode',
  setAccessCode = 'SetAccessCode',
  validAccessCode = 'ValidAccessCode',
}

export type AccessCodeStackParams = {
  [AccessCodeRouteName.accessCode]: undefined
  [AccessCodeRouteName.accessCodeInvalid]: undefined
  [AccessCodeRouteName.accessCodeLogin]: undefined
  [AccessCodeRouteName.setAccessCode]: undefined
  [AccessCodeRouteName.confirmAccessCode]: undefined
  [AccessCodeRouteName.validAccessCode]: undefined
}
