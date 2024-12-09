import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  CityPassModalParams,
  CityPassRouteName,
  CityPassStackParams,
} from '@/modules/city-pass/routes'
import {BudgetScreen} from '@/modules/city-pass/screens/Budget.screen'
import {CityPassDetailsScreen} from '@/modules/city-pass/screens/CityPassDetails.screen'
import {DashboardScreen} from '@/modules/city-pass/screens/Dashboard.screen'
import {LoginStepsScreen} from '@/modules/city-pass/screens/LoginSteps.screen'
import {LogoutScreen} from '@/modules/city-pass/screens/Logout.screen'
import {SecurityCodeScreen} from '@/modules/city-pass/screens/SecurityCode.screen'

export const screenConfig: StackNavigationRoutes<
  CityPassStackParams,
  CityPassRouteName
> = {
  [CityPassRouteName.budget]: {
    component: BudgetScreen,
    name: CityPassRouteName.budget,
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
  [CityPassRouteName.loginSteps]: {
    component: LoginStepsScreen,
    name: CityPassRouteName.loginSteps,
    options: {
      headerTitle: 'Login',
    },
  },
  [CityPassRouteName.cityPassLogout]: {
    component: LogoutScreen,
    name: CityPassRouteName.cityPassLogout,
    options: {
      headerTitle: 'Uitloggen',
    },
  },
  [CityPassRouteName.securityCode]: {
    component: SecurityCodeScreen,
    name: CityPassRouteName.securityCode,
  },
}

export const cityPassModals: StackNavigationRoutes<CityPassModalParams> = {}
