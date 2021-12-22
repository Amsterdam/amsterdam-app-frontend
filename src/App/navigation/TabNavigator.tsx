import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import {tabNavOptions, tabScreenOptions} from './screenOptions'
import {HomeStack, MenuStack, ReportStack} from './stacks'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  const {home, menu, report} = tabNavOptions
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name={home.name}
        component={HomeStack}
        options={home.options}
      />
      <Tab.Screen
        name={report.name}
        component={ReportStack}
        options={report.options}
      />
      <Tab.Screen
        name={menu.name}
        component={MenuStack}
        options={menu.options}
      />
    </Tab.Navigator>
  )
}
