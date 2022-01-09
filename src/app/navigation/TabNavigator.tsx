import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import {menuRoutes, tabRoutes, tabScreenOptions} from './'
import {ActionStack, HomeStack, MenuStack} from './index'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName={tabRoutes.home.name}
    screenOptions={tabScreenOptions}>
    <Tab.Screen
      component={HomeStack}
      name={tabRoutes.home.name}
      options={tabRoutes.home.options}
    />
    <Tab.Screen
      component={ActionStack}
      name={tabRoutes.action.name}
      options={tabRoutes.action.options}
    />
    <Tab.Screen
      component={MenuStack}
      name={tabRoutes.menu.name}
      listeners={({navigation}) => ({
        tabPress: e => {
          e.preventDefault()
          navigation.navigate(tabRoutes.menu.name, {
            screen: menuRoutes.menu.name,
          })
        },
      })}
      options={tabRoutes.menu.options}
    />
  </Tab.Navigator>
)
