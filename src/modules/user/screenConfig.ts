import {StackNavigationRoutes} from '@/app/navigation'
import {
  UserModalParams,
  UserRouteName,
  UserStackParams,
} from '@/modules/user/routes'
import {UserScreen} from '@/modules/user/screens'

export const userScreenConfig: StackNavigationRoutes<
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
