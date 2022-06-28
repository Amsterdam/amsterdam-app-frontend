import {UserStackParams, UserRouteName} from './routes'
import {UserScreen} from './screens'
import {StackNavigationRoutes} from '@/app/navigation'

export const userScreenConfig: StackNavigationRoutes<
  UserStackParams,
  UserRouteName
> = {
  [UserRouteName.user]: {
    component: UserScreen,
    name: UserRouteName.user,
    options: {
      headerTitle: 'Mijn Profiel',
    },
  },
}
