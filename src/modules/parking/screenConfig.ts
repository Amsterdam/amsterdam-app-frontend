import {StackNavigationRoutes} from '@/app/navigation/types'
import {AddLicensePlateHeaderButton} from '@/modules/parking/components/license-plates/AddLicensePlateHeaderButton'
import {ParkingRouteName, ParkingStackParams} from '@/modules/parking/routes'
import {AddLicensePlateScreen} from '@/modules/parking/screens/AddLicensePlate.screen'
import {ParkingActiveSessionsScreen} from '@/modules/parking/screens/ParkingActiveSessions.screen'
import {ParkingDashboardScreen} from '@/modules/parking/screens/ParkingDashBoard.screen'
import {ParkingEditSessionScreen} from '@/modules/parking/screens/ParkingEditSession.screen'
import {ParkingIncreaseBalanceScreen} from '@/modules/parking/screens/ParkingIncreaseBalance.screen'
import {ParkingLogoutScreen} from '@/modules/parking/screens/ParkingLogout.screen'
import {ParkingMoneyTransactionsScreen} from '@/modules/parking/screens/ParkingMoneyTransactions.screen'
import {ParkingMyLicensePlatesScreen} from '@/modules/parking/screens/ParkingMyLicensePlates.screen'
import {ParkingPermitZonesScreen} from '@/modules/parking/screens/ParkingPermitZones.screen'
import {ParkingPlannedSessionsScreen} from '@/modules/parking/screens/ParkingPlannedSessions.screen'
import {ParkingSessionScreen} from '@/modules/parking/screens/ParkingSession.screen'
import {ParkingSessionHistoryScreen} from '@/modules/parking/screens/ParkingSessionHistoryScreen.screen'
import {ParkingStartSessionScreen} from '@/modules/parking/screens/ParkingStartSession.screen'
import {ParkingAccountChangePinCodeScreen} from '@/modules/parking/screens/account/AccountChangePinCode.screen'
import {ParkingAccountDetailsScreen} from '@/modules/parking/screens/account/AccountDetails.screen'
import {ParkingManageVisitorScreen} from '@/modules/parking/screens/manageVisitor/ManageVisitor.screen'
import {ParkingManageVisitorChangePinCodeScreen} from '@/modules/parking/screens/manageVisitor/ManageVisitorChangePinCode.screen'
import {ParkingManageVisitorAdjustTimeBalanceScreen} from '@/modules/parking/screens/manageVisitor/ParkingManageVisitorAdjustTimeBalanceScreen'

export const parkingScreenConfig: StackNavigationRoutes<
  ParkingStackParams,
  Exclude<
    ParkingRouteName,
    | ParkingRouteName.intro
    | ParkingRouteName.login
    | ParkingRouteName.loginSteps
    | ParkingRouteName.requestPinCode
    | ParkingRouteName.forgotAccessCode
  >
> = {
  [ParkingRouteName.dashboard]: {
    component: ParkingDashboardScreen,
    name: ParkingRouteName.dashboard,
    options: {
      headerShown: false,
      headerTitle: 'Aanmelden parkeren',
    },
  },
  [ParkingRouteName.startSession]: {
    component: ParkingStartSessionScreen,
    name: ParkingRouteName.startSession,
    options: {
      headerShown: false,
      headerTitle: 'Nieuwe parkeersessie',
    },
  },
  [ParkingRouteName.editSession]: {
    component: ParkingEditSessionScreen,
    name: ParkingRouteName.editSession,
    options: {
      headerShown: false,
      headerTitle: 'Parkeersessie aanpassen',
    },
  },
  [ParkingRouteName.myLicensePlates]: {
    component: ParkingMyLicensePlatesScreen,
    name: ParkingRouteName.myLicensePlates,
    options: {
      headerTitle: 'Mijn kentekens',
      SideComponent: AddLicensePlateHeaderButton,
    },
  },
  [ParkingRouteName.addLicensePlate]: {
    component: AddLicensePlateScreen,
    name: ParkingRouteName.addLicensePlate,
    options: {
      headerTitle: 'Nieuw kenteken',
    },
  },
  [ParkingRouteName.parkingPermitZones]: {
    component: ParkingPermitZonesScreen,
    name: ParkingRouteName.parkingPermitZones,
  },
  [ParkingRouteName.parkingSession]: {
    component: ParkingSessionScreen,
    name: ParkingRouteName.parkingSession,
    options: {
      headerTitle: 'Parkeersessie',
    },
  },
  [ParkingRouteName.parkingActiveSessions]: {
    component: ParkingActiveSessionsScreen,
    name: ParkingRouteName.parkingActiveSessions,
    options: {
      headerTitle: 'Actief',
    },
  },
  [ParkingRouteName.parkingPlannedSessions]: {
    component: ParkingPlannedSessionsScreen,
    name: ParkingRouteName.parkingPlannedSessions,
    options: {
      headerTitle: 'Gepland',
    },
  },
  [ParkingRouteName.parkingSessionTransactions]: {
    component: ParkingSessionHistoryScreen,
    name: ParkingRouteName.parkingSessionTransactions,
    options: {
      headerTitle: 'Parkeergeschiedenis',
    },
  },
  [ParkingRouteName.parkingMoneyTransactions]: {
    component: ParkingMoneyTransactionsScreen,
    name: ParkingRouteName.parkingMoneyTransactions,
    options: {
      headerTitle: 'Betalingen',
    },
  },
  [ParkingRouteName.increaseBalance]: {
    component: ParkingIncreaseBalanceScreen,
    name: ParkingRouteName.increaseBalance,
    options: {
      headerShown: false,
      headerTitle: 'Geld toevoegen',
    },
  },
  [ParkingRouteName.manageVisitor]: {
    component: ParkingManageVisitorScreen,
    name: ParkingRouteName.manageVisitor,
    options: {
      headerTitle: 'Bezoeker laten betalen',
    },
  },
  [ParkingRouteName.manageVisitorChangePinCode]: {
    component: ParkingManageVisitorChangePinCodeScreen,
    name: ParkingRouteName.manageVisitorChangePinCode,
    options: {
      headerTitle: 'Pincode wijzigen',
    },
  },
  [ParkingRouteName.manageVisitorAdjustTimeBalance]: {
    component: ParkingManageVisitorAdjustTimeBalanceScreen,
    name: ParkingRouteName.manageVisitorAdjustTimeBalance,
    options: {
      headerShown: false,
    },
  },
  [ParkingRouteName.accountDetails]: {
    component: ParkingAccountDetailsScreen,
    name: ParkingRouteName.accountDetails,
    options: {
      headerTitle: 'Accountgegevens',
    },
  },
  [ParkingRouteName.accountChangePinCode]: {
    component: ParkingAccountChangePinCodeScreen,
    name: ParkingRouteName.accountChangePinCode,
    options: {
      headerTitle: 'Pincode wijzigen',
    },
  },
  [ParkingRouteName.logout]: {
    component: ParkingLogoutScreen,
    name: ParkingRouteName.logout,
    options: {
      headerTitle: 'Uitloggen',
    },
  },
}
