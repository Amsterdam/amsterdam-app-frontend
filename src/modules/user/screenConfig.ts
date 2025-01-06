import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  UserModalParams,
  UserRouteName,
  UserStackParams,
} from '@/modules/user/routes'
import {ModuleSettingsScreen} from '@/modules/user/screens/ModuleSettings.screen'
import {UserScreen} from '@/modules/user/screens/User.screen'
import {UserBiometricsScreen} from '@/modules/user/screens/UserBiometrics.screen'

export const screenConfig: StackNavigationRoutes<
  UserStackParams,
  UserRouteName
> = {
  [UserRouteName.moduleSettings]: {
    component: ModuleSettingsScreen,
    name: UserRouteName.moduleSettings,
    options: {
      headerTitle: 'Onderwerpen in de app',
    },
  },
  [UserRouteName.user]: {
    component: UserScreen,
    name: UserRouteName.user,
    options: {
      headerTitle: 'Mijn profiel',
    },
  },
  [UserRouteName.userBiometrics]: {
    component: UserBiometricsScreen,
    name: UserRouteName.userBiometrics,
    options: {
      headerTitle: 'Biometrische gegevens',
    },
  },
}

export const userModals: StackNavigationRoutes<UserModalParams> = {}
