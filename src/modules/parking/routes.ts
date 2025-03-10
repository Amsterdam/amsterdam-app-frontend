export enum ParkingRouteName {
  dashboard = 'ParkingDashboard',
  intro = 'ParkingIntro',
  login = 'ParkingLogin',
  loginSteps = 'ParkingLoginSteps',
  myLicensePlates = 'ParkingMyLicensePlates',
  requestPinCode = 'ParkingRequestPinCode',
  restartLogin = 'ParkingRestartLogin',
  startSession = 'ParkingStartSession',
}

export type ParkingStackParams = {
  [ParkingRouteName.dashboard]: undefined
  [ParkingRouteName.intro]: undefined
  [ParkingRouteName.login]: undefined
  [ParkingRouteName.loginSteps]: undefined
  [ParkingRouteName.myLicensePlates]: undefined
  [ParkingRouteName.requestPinCode]: undefined
  [ParkingRouteName.restartLogin]: undefined
  [ParkingRouteName.startSession]: undefined
}
