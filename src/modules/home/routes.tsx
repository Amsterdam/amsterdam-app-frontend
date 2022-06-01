import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {Theme} from '../../themes'
import {HeaderLogo, HeaderNavigation} from './components'
import {HomeScreen, SettingsScreen} from './screens'

export enum HomeRouteName {
  home = 'Home',
  settings = 'Settings',
}

type HomeStackParams = {
  Home: undefined
  Settings: undefined
}

export const homeRoutes: (
  theme: Theme,
) => StackNavigationRoutes<HomeStackParams, HomeRouteName> = ({color}) => ({
  [HomeRouteName.home]: {
    component: HomeScreen,
    name: HomeRouteName.home,
    options: {
      headerLeft: () => <HeaderLogo />,
      headerRight: () => <HeaderNavigation />,
      headerTitle: '',
    },
  },
  [HomeRouteName.settings]: {
    component: SettingsScreen,
    name: HomeRouteName.settings,
    options: {
      cardStyle: {
        backgroundColor: color.screen.background.settings,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Instellingen" />,
    },
  },
})
