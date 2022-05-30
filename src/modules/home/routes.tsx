import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {Theme} from '../../themes'
import {HeaderLogo, HeaderNavigation} from './components'

type HomeStackParams = {
  Home: undefined
  Settings: undefined
}

export const homeRoutes: (
  theme: Theme,
) => StackNavigationRoutes<HomeStackParams, 'home' | 'settings'> = ({
  color,
}) => ({
  home: {
    name: 'Home',
    options: {
      headerLeft: () => <HeaderLogo />,
      headerRight: () => <HeaderNavigation />,
      headerTitle: '',
    },
  },
  settings: {
    name: 'Settings',
    options: {
      cardStyle: {
        backgroundColor: color.screen.background.settings,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Instellingen" />,
    },
  },
})
