import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {HeaderLogo} from './components/HeaderLogo'
import {HeaderNavigation} from './components/HeaderNavigation'

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
