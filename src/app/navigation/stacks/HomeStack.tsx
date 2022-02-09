import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {getSharedScreens, HeaderNavigation, stackScreenOptions} from '..'
import {HomeScreen} from '../../../screens'
import {routes} from '../routes'

const Stack = createStackNavigator()

const homeScreenOptions: StackNavigationOptions = {
  headerRight: () => <HeaderNavigation />,
}

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={{
        ...stackScreenOptions,
      }}>
      <Stack.Screen
        component={HomeScreen}
        name={routes.home.name}
        options={{...routes.home.options, ...homeScreenOptions}}
      />
      {getSharedScreens(Stack)}
    </Stack.Navigator>
  )
}
