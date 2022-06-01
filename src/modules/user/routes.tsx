import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

export enum UserRouteName {
  home = 'Home',
}

export type UserStackParams = {
  [UserRouteName.home]: undefined
}

export const userRoutes: StackNavigationRoutes<UserStackParams, UserRouteName> =
  {
    [UserRouteName.home]: {
      name: UserRouteName.home,
      options: {
        headerTitle: () => <NonScalingHeaderTitle text="Mijn Profiel" />,
      },
    },
  }
