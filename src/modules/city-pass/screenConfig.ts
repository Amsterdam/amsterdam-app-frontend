import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  CityPassModalParams,
  CityPassRouteName,
  CityPassStackParams,
} from '@/modules/city-pass/routes'
import {CityPassDetailsScreen} from '@/modules/city-pass/screens/CityPassDetails.screen'
import {DashboardScreen} from '@/modules/city-pass/screens/Dashboard.screen'
import {ViewCityPassScreen} from '@/modules/city-pass/screens/ViewCityPass.screen'

export const screenConfig: StackNavigationRoutes<
  CityPassStackParams,
  CityPassRouteName
> = {
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
  [CityPassRouteName.cityPassView]: {
    component: ViewCityPassScreen,
    name: CityPassRouteName.cityPassView,
    options: {
      headerTitle: 'Stadspas',
    },
  },
}

export const cityPassModals: StackNavigationRoutes<CityPassModalParams> = {}
