import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  CityPassModalParams,
  CityPassRouteName,
  CityPassStackParams,
} from '@/modules/city-pass/routes'
import {BalanceScreen} from '@/modules/city-pass/screens/Balance.screen'
import {CityPassDetailsScreen} from '@/modules/city-pass/screens/CityPassDetails.screen'
import {DashboardScreen} from '@/modules/city-pass/screens/Dashboard.screen'
import {SecurityCodeScreen} from '@/modules/city-pass/screens/SecurityCode.screen'

export const screenConfig: StackNavigationRoutes<
  CityPassStackParams,
  CityPassRouteName
> = {
  [CityPassRouteName.balance]: {
    component: BalanceScreen,
    name: CityPassRouteName.balance,
  },
  [CityPassRouteName.dashboard]: {
    component: DashboardScreen,
    name: CityPassRouteName.dashboard,
    options: {
      headerTitle: 'Stadspas',
    },
  },
  [CityPassRouteName.cityPassDetails]: {
    component: CityPassDetailsScreen,
    name: CityPassRouteName.cityPassDetails,
    options: {
      headerTitle: 'Stadspas',
    },
  },
  [CityPassRouteName.securityCode]: {
    component: SecurityCodeScreen,
    name: CityPassRouteName.securityCode,
  },
}

export const cityPassModals: StackNavigationRoutes<CityPassModalParams> = {}
