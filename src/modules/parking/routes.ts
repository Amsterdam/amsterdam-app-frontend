import {ParkingSession} from '@/modules/parking/types'

export enum ParkingRouteName {
  addLicensePlate = 'ParkingAddLicensePlate',
  dashboard = 'ParkingDashboard',
  intro = 'ParkingIntro',
  login = 'ParkingLogin',
  loginSteps = 'ParkingLoginSteps',
  myLicensePlates = 'ParkingMyLicensePlates',
  parkingPlannedSessions = 'ParkingPlannedSessions',
  parkingSession = 'ParkingSession',
  requestPinCode = 'ParkingRequestPinCode',
  restartLogin = 'ParkingRestartLogin',
  startSession = 'ParkingStartSession',
}

export type ParkingStackParams = {
  [ParkingRouteName.addLicensePlate]: undefined
  [ParkingRouteName.dashboard]: undefined
  [ParkingRouteName.intro]: undefined
  [ParkingRouteName.login]: undefined
  [ParkingRouteName.loginSteps]: undefined
  [ParkingRouteName.myLicensePlates]: undefined
  [ParkingRouteName.parkingPlannedSessions]: undefined
  [ParkingRouteName.parkingSession]: {parkingSession: ParkingSession}
  [ParkingRouteName.requestPinCode]: undefined
  [ParkingRouteName.restartLogin]: undefined
  [ParkingRouteName.startSession]: undefined
}
