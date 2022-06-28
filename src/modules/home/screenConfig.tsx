import React from 'react'
import {HomeStackParams, HomeRouteName} from './routes'
import {AdminScreen, HomeScreen, SettingsScreen} from './screens'
import {StackNavigationRoutes} from '@/app/navigation'
import {HeaderLogo, HeaderNavigation} from '@/modules/home/components'

export const homeScreenConfig: StackNavigationRoutes<
  HomeStackParams,
  HomeRouteName
> = {
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
