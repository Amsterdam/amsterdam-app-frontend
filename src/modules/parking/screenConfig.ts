import {StackNavigationRoutes} from '@/app/navigation/types'
import {AddLicensePlateHeaderButton} from '@/modules/parking/components/license-plates/AddLicensePlateHeaderButton'
import {ParkingRouteName, ParkingStackParams} from '@/modules/parking/routes'
import {AddLicensePlateScreen} from '@/modules/parking/screens/AddLicensePlate.screen'
import {ParkingDashboardScreen} from '@/modules/parking/screens/ParkingDashBoard.screen'
import {ParkingMyLicensePlatesScreen} from '@/modules/parking/screens/ParkingMyLicensePlates.screen'
import {ParkingPlannedSessionsScreen} from '@/modules/parking/screens/ParkingPlannedSessions.screen'
import {ParkingSessionScreen} from '@/modules/parking/screens/ParkingSession.screen'
import {ParkingStartSessionScreen} from '@/modules/parking/screens/ParkingStartSession.screen'

export const parkingScreenConfig: StackNavigationRoutes<
  ParkingStackParams,
  | ParkingRouteName.dashboard
  | ParkingRouteName.myLicensePlates
  | ParkingRouteName.startSession
  | ParkingRouteName.addLicensePlate
  | ParkingRouteName.parkingSession
  | ParkingRouteName.parkingPlannedSessions
> = {
  [ParkingRouteName.dashboard]: {
    component: ParkingDashboardScreen,
    name: ParkingRouteName.dashboard,
    options: {headerShown: false, headerTitle: 'Aanmelden parkeren'},
  },
  [ParkingRouteName.startSession]: {
    component: ParkingStartSessionScreen,
    name: ParkingRouteName.startSession,
    options: {headerShown: false, headerTitle: 'Nieuwe parkeersessie'},
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
  [ParkingRouteName.parkingSession]: {
    component: ParkingSessionScreen,
    name: ParkingRouteName.parkingSession,
    options: {
      headerTitle: 'Parkeersessie',
    },
  },
  [ParkingRouteName.parkingPlannedSessions]: {
    component: ParkingPlannedSessionsScreen,
    name: ParkingRouteName.parkingPlannedSessions,
    options: {
      headerTitle: 'Gepland',
    },
  },
}
