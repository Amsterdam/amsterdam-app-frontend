import React from 'react'
import {
  HeaderLogo,
  HeaderNavigation,
  StackNavigationRoutes,
} from '../../app/navigation'
import {color} from '../../tokens'

type HomeStackParams = {
  Home: undefined
}

export const homeRoutes: StackNavigationRoutes<HomeStackParams, 'home'> = {
  home: {
    name: 'Home',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      headerLeft: () => <HeaderLogo />,
      headerRight: () => <HeaderNavigation />,
      headerTitle: '',
    },
  },
}
