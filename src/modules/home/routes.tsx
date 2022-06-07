import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {HeaderLogo, HeaderNavigation} from './components'
import {AdminScreen, HomeScreen, SettingsScreen} from './screens'

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
        headerTitle: () => <NonScalingHeaderTitle text="Omgeving selecteren" />,
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
        headerTitle: () => <NonScalingHeaderTitle text="Instellingen" />,
      },
    },
  }
