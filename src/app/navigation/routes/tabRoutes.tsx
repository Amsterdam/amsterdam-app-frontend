import React from 'react'
import {NonScalingTabBarLabel, TabBarIcon} from '../../../components/ui'
import {TabNavigationRoutes, TabParams} from '../types'

export const tabRoutes: TabNavigationRoutes<TabParams> = {
  action: {
    name: 'ActionTab',
    options: {
      tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="action" />,
      tabBarLabel: () => <NonScalingTabBarLabel text="Melden" />,
    },
  },
  home: {
    name: 'HomeTab',
    options: {
      tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="home" />,
      tabBarLabel: () => <NonScalingTabBarLabel text="Home" />,
    },
  },
  menu: {
    name: 'MenuTab',
    options: {
      headerShown: false,
      tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="menu" />,
      tabBarLabel: () => <NonScalingTabBarLabel text="Menu" />,
    },
  },
}
