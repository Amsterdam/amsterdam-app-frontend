import React from 'react'
import {AdminScreen, HomeScreen, SettingsScreen} from './screens'
import {StackNavigationRoutes} from '@/app/navigation'
import {HeaderLogo, HeaderNavigation} from '@/modules/home/components'

export enum HomeRouteName {
  admin = 'Admin',
  home = 'Home',
  settings = 'Settings',
}

export type HomeStackParams = {
  [HomeRouteName.admin]: undefined
  [HomeRouteName.home]: undefined
  [HomeRouteName.settings]: undefined
}

export const homeRoutes: StackNavigationRoutes<HomeStackParams, HomeRouteName> =
  {
    [HomeRouteName.admin]: {
      component: AdminScreen,
      name: HomeRouteName.admin,
      options: {
        headerTitle: 'Omgeving selecteren',
      },
    },
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
        headerTitle: 'Instellingen',
      },
    },
  }
