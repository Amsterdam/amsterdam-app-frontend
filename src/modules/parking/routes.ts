export enum ParkingRouteName {
  dashboard = 'ParkingDashboard',
  intro = 'ParkingIntro',
  login = 'ParkingLogin',
  loginSteps = 'ParkingLoginSteps',
  requestPinCode = 'ParkingRequestPinCode',
  restartLogin = 'ParkingRestartLogin',
}

export type ParkingStackParams = {
  [ParkingRouteName.dashboard]: undefined
  [ParkingRouteName.intro]: undefined
  [ParkingRouteName.login]: undefined
  [ParkingRouteName.loginSteps]: undefined
  [ParkingRouteName.requestPinCode]: undefined
  [ParkingRouteName.restartLogin]: undefined
}
