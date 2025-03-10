import {StackNavigationRoutes} from '@/app/navigation/types'
import {ParkingAddLicensePlateHeaderButton} from '@/modules/parking/components/license-plates/ParkingAddLicensePlateHeaderButton'
import {ParkingRouteName, ParkingStackParams} from '@/modules/parking/routes'
import {ParkingDashboardScreen} from '@/modules/parking/screens/ParkingDashBoard.screen'
import {ParkingMyLicensePlatesScreen} from '@/modules/parking/screens/ParkingMyLicensePlates.screen'
import {ParkingStartSessionScreen} from '@/modules/parking/screens/ParkingStartSession.screen'

export const parkingScreenConfig: StackNavigationRoutes<
  ParkingStackParams,
  | ParkingRouteName.dashboard
  | ParkingRouteName.myLicensePlates
  | ParkingRouteName.startSession
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
      SideComponent: ParkingAddLicensePlateHeaderButton,
    },
  },
}
