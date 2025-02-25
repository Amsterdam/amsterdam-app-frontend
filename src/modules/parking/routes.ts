export enum ParkingRouteName {
  dashboard = 'ParkingDashboard',
  intro = 'ParkingIntro',
  login = 'ParkingLogin',
  loginSteps = 'ParkingLoginSteps',
  restartLogin = 'ParkingRestartLogin',
}

export type ParkingStackParams = {
  [ParkingRouteName.dashboard]: undefined
  [ParkingRouteName.intro]: undefined
  [ParkingRouteName.login]: undefined
  [ParkingRouteName.loginSteps]: undefined
  [ParkingRouteName.restartLogin]: undefined
}
