import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {stackScreenOptions} from '../'
import {AdminScreen, ContactScreen, MenuScreen} from '../../../screens'
import {menuRoutes} from '../routes'
import {getShared} from './HomeStack'

const Stack = createStackNavigator()

export const MenuStack = () => {
  const shared = getShared(Stack)
  return (
    <Stack.Navigator
      initialRouteName={menuRoutes.menu.name}
      screenOptions={stackScreenOptions}>
      <Stack.Screen
        component={AdminScreen}
        name={menuRoutes.admin.name}
        options={menuRoutes.admin.options}
      />
      <Stack.Screen
        component={ContactScreen}
        name={menuRoutes.contact.name}
        options={menuRoutes.contact.options}
      />
      <Stack.Screen
        component={MenuScreen}
        name={menuRoutes.menu.name}
        options={menuRoutes.menu.options}
      />
      {shared}
    </Stack.Navigator>
  )
}
