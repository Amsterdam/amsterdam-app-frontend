import {ParkingSession, VisitorParkingSession} from '@/modules/parking/types'

export enum ParkingRouteName {
  addLicensePlate = 'ParkingAddLicensePlate',
  dashboard = 'ParkingDashboard',
  editSession = 'ParkingEditSession',
  increaseBalance = 'ParkingIncreaseBalance',
  intro = 'ParkingIntro',
  login = 'ParkingLogin',
  loginSteps = 'ParkingLoginSteps',
  manageVisitor = 'ParkingManageVisitor',
  manageVisitorChangePinCode = 'ParkingManageVisitorChangePinCode',
  manageVisitorDecreaseTimeBalance = 'ParkingManageVisitorDecreaseTimeBalance',
  manageVisitorIncreaseTimeBalance = 'ParkingManageVisitorIncreaseTimeBalance',
  myLicensePlates = 'ParkingMyLicensePlates',
  parkingMoneyTransactions = 'ParkingMoneyTransactions',
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
  [ParkingRouteName.parkingPlannedSessions]:
    | {visitorVehicleId: string}
    | undefined
  [ParkingRouteName.parkingSession]: {
    parkingSession: ParkingSession | VisitorParkingSession
  }
  [ParkingRouteName.parkingSessionTransactions]: undefined
  [ParkingRouteName.parkingMoneyTransactions]: undefined
  [ParkingRouteName.editSession]: {parkingSession: ParkingSession}
  [ParkingRouteName.requestPinCode]: undefined
  [ParkingRouteName.restartLogin]: undefined
  [ParkingRouteName.startSession]: undefined
  [ParkingRouteName.increaseBalance]: undefined
  [ParkingRouteName.manageVisitor]: undefined
  [ParkingRouteName.manageVisitorChangePinCode]: undefined
  [ParkingRouteName.manageVisitorDecreaseTimeBalance]: undefined
  [ParkingRouteName.manageVisitorIncreaseTimeBalance]: undefined
}
