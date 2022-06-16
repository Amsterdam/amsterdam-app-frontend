import {StackNavigationRoutes} from '../../app/navigation'
import {UserScreen} from './screens'

export enum UserRouteName {
  user = 'User',
}

export type UserStackParams = {
  [UserRouteName.user]: undefined
}

export const userRoutes: StackNavigationRoutes<UserStackParams, UserRouteName> =
  {
    [UserRouteName.user]: {
      component: UserScreen,
      name: UserRouteName.user,
      options: {
        headerTitle: 'Mijn Profiel',
      },
    },
  }
