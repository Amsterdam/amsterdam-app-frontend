import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  UserModalParams,
  UserRouteName,
  UserStackParams,
} from '@/modules/user/routes'
import {UserScreen} from '@/modules/user/screens/User.screen'

export const screenConfig: StackNavigationRoutes<
  UserStackParams,
  UserRouteName
> = {
  [UserRouteName.user]: {
    component: UserScreen,
    name: UserRouteName.user,
    options: {
      headerTitle: 'Mijn profiel',
    },
  },
}

export const userModals: StackNavigationRoutes<UserModalParams> = {}
