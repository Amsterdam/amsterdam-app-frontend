import {TransitionPresets} from '@react-navigation/stack'
import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  CityPassRouteName,
  CityPassStackParams,
} from '@/modules/city-pass/routes'
import {BudgetScreen} from '@/modules/city-pass/screens/Budget.screen'
import {CityPassDetailsScreen} from '@/modules/city-pass/screens/CityPassDetails.screen'
import {CityPassesScreen} from '@/modules/city-pass/screens/CityPasses.screen'
import {DashboardScreen} from '@/modules/city-pass/screens/Dashboard.screen'
import {LogoutScreen} from '@/modules/city-pass/screens/Logout.screen'
import {SecurityCodeScreen} from '@/modules/city-pass/screens/SecurityCode.screen'

export const cityPassScreenConfig: StackNavigationRoutes<
  CityPassStackParams,
  | CityPassRouteName.budget
  | CityPassRouteName.dashboard
  | CityPassRouteName.cityPassDetails
  | CityPassRouteName.cityPassLogout
  | CityPassRouteName.cityPasses
  | CityPassRouteName.securityCode
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
  [CityPassRouteName.budget]: {
    component: BudgetScreen,
    name: CityPassRouteName.budget,
  },

  [CityPassRouteName.cityPassLogout]: {
    component: LogoutScreen,
    name: CityPassRouteName.cityPassLogout,
    options: {
      headerTitle: 'Uitloggen',
    },
  },
  [CityPassRouteName.cityPasses]: {
    component: CityPassesScreen,
    name: CityPassRouteName.cityPasses,
    options: {
      headerTitle: 'Stadspas tonen',
      ...TransitionPresets.ModalFadeTransition,
    },
  },
  [CityPassRouteName.securityCode]: {
    component: SecurityCodeScreen,
    name: CityPassRouteName.securityCode,
  },
}
