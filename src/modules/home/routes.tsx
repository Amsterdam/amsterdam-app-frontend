import React from 'react'
import {HeaderLogo, StackNavigationRoutes} from '../../app/navigation'

type HomeModuleStackParams = {
  Home: undefined
}

export const homeRoutes: StackNavigationRoutes<HomeModuleStackParams, 'home'> =
  {
    home: {
      name: 'Home',
      options: {
        headerLeft: () => <HeaderLogo />,
        headerTitle: '',
      },
    },
  }
