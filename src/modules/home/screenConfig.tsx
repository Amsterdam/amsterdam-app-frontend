import React from 'react'
import {StackNavigationRoutes} from '@/app/navigation'
import {HeaderLogo, HeaderNavigation} from '@/modules/home/components'
import {
  HomeStackParams,
  HomeRouteName,
  HomeModalParams,
} from '@/modules/home/routes'
import {AdminScreen, HomeScreen, SettingsScreen} from '@/modules/home/screens'

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

export const homeModals: StackNavigationRoutes<HomeModalParams> = {}
