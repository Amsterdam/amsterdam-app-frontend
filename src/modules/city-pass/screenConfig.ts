import {StackNavigationRoutes} from '@/app/navigation/types'
import {setAccessCodeScreenConfig} from '@/modules/access-code/screenConfig'
import {
  CityPassRouteName,
  CityPassStackParams,
} from '@/modules/city-pass/routes'
import {BudgetScreen} from '@/modules/city-pass/screens/Budget.screen'
import {CityPassDetailsScreen} from '@/modules/city-pass/screens/CityPassDetails.screen'
import {DashboardScreen} from '@/modules/city-pass/screens/Dashboard.screen'
import {LoginScreen} from '@/modules/city-pass/screens/Login.screen'
import {LoginStepsScreen} from '@/modules/city-pass/screens/LoginSteps.screen'
import {LogoutScreen} from '@/modules/city-pass/screens/Logout.screen'
import {SecurityCodeScreen} from '@/modules/city-pass/screens/SecurityCode.screen'

export const cityPassLoginScreenConfig: StackNavigationRoutes<
  CityPassStackParams,
  CityPassRouteName.loginSteps | CityPassRouteName.login
> = {
  [CityPassRouteName.loginSteps]: {
    component: LoginStepsScreen,
    name: CityPassRouteName.loginSteps,
    options: {
      headerTitle: 'Login',
    },
  },
  [CityPassRouteName.login]: {
    component: LoginScreen,
    name: CityPassRouteName.login,
    options: {
      headerTitle: 'Stadspas',
    },
  },
  ...setAccessCodeScreenConfig,
}

export const cityPassScreenConfig: StackNavigationRoutes<
  CityPassStackParams,
  | CityPassRouteName.budget
  | CityPassRouteName.dashboard
  | CityPassRouteName.cityPassDetails
  | CityPassRouteName.cityPassLogout
  | CityPassRouteName.securityCode
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
