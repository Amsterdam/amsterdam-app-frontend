import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {HeaderLogo, HeaderNavigation} from './components'
import {HomeScreen, SettingsScreen} from './screens'

export enum HomeRouteName {
  home = 'Home',
  settings = 'Settings',
}

export type HomeStackParams = {
  [HomeRouteName.home]: undefined
  [HomeRouteName.settings]: undefined
}

export const homeRoutes: StackNavigationRoutes<HomeStackParams, HomeRouteName> =
  {
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
        headerTitle: () => <NonScalingHeaderTitle text="Instellingen" />,
      },
    },
  }
