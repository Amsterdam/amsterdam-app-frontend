import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {HeaderLogo, HeaderNavigation} from './components'

type HomeStackParams = {
  Home: undefined
}

export const homeRoutes: StackNavigationRoutes<HomeStackParams, 'home'> = {
  home: {
    name: 'Home',
    options: {
      headerLeft: () => <HeaderLogo />,
      headerRight: () => <HeaderNavigation />,
      headerTitle: '',
    },
  },
}
