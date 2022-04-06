import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {getSharedScreens, stackScreenOptions} from '../'
import {ContactScreen, MenuScreen} from '../../../screens'
import {routes} from '../routes'

const Stack = createStackNavigator()

export const MenuStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.menu.name}
      screenOptions={stackScreenOptions}>
      <Stack.Screen
        component={ContactScreen}
        name={routes.contact.name}
        options={routes.contact.options}
      />
      <Stack.Screen
        component={MenuScreen}
        name={routes.menu.name}
        options={routes.menu.options}
      />
      {getSharedScreens(Stack)}
    </Stack.Navigator>
  )
}
