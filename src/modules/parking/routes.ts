import {ParkingSession} from '@/modules/parking/types'

export enum ParkingRouteName {
  addLicensePlate = 'ParkingAddLicensePlate',
  dashboard = 'ParkingDashboard',
  editSession = 'ParkingEditSession',
  increaseBalance = 'ParkingIncreaseBalance',
  intro = 'ParkingIntro',
  login = 'ParkingLogin',
  loginSteps = 'ParkingLoginSteps',
  myLicensePlates = 'ParkingMyLicensePlates',
  parkingPlannedSessions = 'ParkingPlannedSessions',
  parkingSession = 'ParkingSession',
  parkingSessionTransactions = 'ParkingSessionTransactions',
  requestPinCode = 'ParkingRequestPinCode',
  restartLogin = 'ParkingRestartLogin',
  startSession = 'ParkingStartSession',
}

export type ParkingStackParams = {
  [ParkingRouteName.addLicensePlate]: undefined
  [ParkingRouteName.dashboard]:
    | {
        action: 'increase-balance'
        order_id: string
        signature: string
        status: 'EXPIRED' | 'COMPLETED' | 'PENDING' | 'CANCELLED'
      }
    | undefined
  [ParkingRouteName.intro]: undefined
  [ParkingRouteName.login]: undefined
  [ParkingRouteName.loginSteps]: undefined
  [ParkingRouteName.myLicensePlates]: undefined
  [ParkingRouteName.parkingPlannedSessions]: undefined
  [ParkingRouteName.parkingSession]: {parkingSession: ParkingSession}
  [ParkingRouteName.parkingSessionTransactions]: undefined
  [ParkingRouteName.editSession]: {parkingSession: ParkingSession}
  [ParkingRouteName.requestPinCode]: undefined
  [ParkingRouteName.restartLogin]: undefined
  [ParkingRouteName.startSession]: undefined
  [ParkingRouteName.increaseBalance]: undefined
}
