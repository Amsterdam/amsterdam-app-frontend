import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {getSharedScreens, stackScreenOptions} from '../'
import {ContactScreen, MenuScreen} from '../../../screens'
import {ThemeContext} from '../../../themes'
import {routes} from '../routes'

const Stack = createStackNavigator()

export const MenuStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={routes.menu.name}
      screenOptions={stackScreenOptions(theme)}>
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
