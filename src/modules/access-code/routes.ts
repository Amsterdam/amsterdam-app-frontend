export enum AccessCodeRouteName {
  accessCode = 'AccessCode',
  accessCodeInvalid = 'AccessCodeInvalid',
  accessCodeLogin = 'AccessCodeLogin',
  biometricsPermission = 'BiometricsPermission',
  confirmAccessCode = 'ConfirmAccessCode',
  setAccessCode = 'SetAccessCode',
  validAccessCode = 'ValidAccessCode',
}

export type AccessCodeStackParams = {
  [AccessCodeRouteName.accessCode]: undefined
  [AccessCodeRouteName.accessCodeInvalid]: undefined
  [AccessCodeRouteName.accessCodeLogin]: undefined
  [AccessCodeRouteName.biometricsPermission]: undefined
  [AccessCodeRouteName.setAccessCode]: undefined
  [AccessCodeRouteName.confirmAccessCode]: undefined
  [AccessCodeRouteName.validAccessCode]: undefined
}
