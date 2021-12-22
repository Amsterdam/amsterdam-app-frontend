import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import {TabBarIcon} from '../../components/ui'
import {tabScreenOptions} from './screenOptions'
import {HomeStack, MenuStack, ReportStack} from './stacks'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="home" />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ReportTab"
        component={ReportStack}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="report" />
          ),
          tabBarLabel: 'Melden',
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="menu" />
          ),
          tabBarLabel: 'Menu',
        }}
      />
    </Tab.Navigator>
  )
}
