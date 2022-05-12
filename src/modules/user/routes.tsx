import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type UserStackParams = {
  User: undefined
}

export const userRoutes: StackNavigationRoutes<UserStackParams, 'user'> = {
  user: {
    name: 'User',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Mijn Profiel" />,
    },
  },
}
