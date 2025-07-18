import {ParkingSession, VisitorParkingSession} from '@/modules/parking/types'

export enum ParkingRouteName {
  accountChangePinCode = 'ParkingAccountChangePinCode',
  accountDetails = 'ParkingAccountDetails',
  addLicensePlate = 'ParkingAddLicensePlate',
  dashboard = 'ParkingDashboard',
  editSession = 'ParkingEditSession',
  forgotAccessCode = 'ParkingForgotAccessCode',
  increaseBalance = 'ParkingIncreaseBalance',
  intro = 'ParkingIntro',
  login = 'ParkingLogin',
  loginSteps = 'ParkingLoginSteps',
  manageVisitor = 'ParkingManageVisitor',
  manageVisitorAdjustTimeBalance = 'ParkingManageVisitorAdjustTimeBalance',
  manageVisitorChangePinCode = 'ParkingManageVisitorChangePinCode',
  myLicensePlates = 'ParkingMyLicensePlates',
  parkingActiveSessions = 'ParkingActiveSessions',
  parkingMoneyTransactions = 'ParkingMoneyTransactions',
  parkingPermitZones = 'ParkingPermitZones',
  parkingPlannedSessions = 'ParkingPlannedSessions',
  parkingSession = 'ParkingSession',
  parkingSessionTransactions = 'ParkingSessionTransactions',
  requestPinCode = 'ParkingRequestPinCode',
  startSession = 'ParkingStartSession',
}

export type ParkingStackParams = {
  [ParkingRouteName.addLicensePlate]: undefined
  [ParkingRouteName.dashboard]:
    | {
        action: 'increase-balance' | 'start-session-and-increase-balance'
        order_id: string
        signature: string
        status: 'EXPIRED' | 'COMPLETED' | 'PENDING' | 'CANCELLED'
      }
    | undefined
  [ParkingRouteName.intro]: undefined
  [ParkingRouteName.login]:
    | {
        pin: string
        reportCode: string
      }
    | undefined
  [ParkingRouteName.loginSteps]: undefined
  [ParkingRouteName.myLicensePlates]: undefined
  [ParkingRouteName.parkingActiveSessions]: undefined
  [ParkingRouteName.parkingPermitZones]: undefined
  [ParkingRouteName.parkingPlannedSessions]: undefined
  [ParkingRouteName.parkingSession]: {
    parkingSession: ParkingSession | VisitorParkingSession
  }
  [ParkingRouteName.parkingSessionTransactions]: undefined
  [ParkingRouteName.parkingMoneyTransactions]: undefined
  [ParkingRouteName.editSession]: {parkingSession: ParkingSession}
  [ParkingRouteName.requestPinCode]: undefined
  [ParkingRouteName.forgotAccessCode]: undefined
  [ParkingRouteName.startSession]: {defaultStartTime: string} | undefined
  [ParkingRouteName.increaseBalance]: undefined
  [ParkingRouteName.manageVisitor]: undefined
  [ParkingRouteName.manageVisitorChangePinCode]: undefined
  [ParkingRouteName.manageVisitorAdjustTimeBalance]:
    | {subtractTime: boolean}
    | undefined
  [ParkingRouteName.accountDetails]: undefined
  [ParkingRouteName.accountChangePinCode]: undefined
}
