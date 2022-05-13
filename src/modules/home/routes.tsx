import React from 'react'
import {
  HeaderLogo,
  HeaderNavigation,
  StackNavigationRoutes,
} from '../../app/navigation'

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
