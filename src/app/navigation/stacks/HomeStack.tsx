import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {getSharedScreens, HeaderNavigation, stackScreenOptions} from '..'
import {BestWishes21Screen, HomeScreen} from '../../../screens'
import {routes} from '../routes'

const Stack = createStackNavigator()

const homeScreenOptions: StackNavigationOptions = {
  headerRight: () => <HeaderNavigation />,
}

export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName={routes.home.name}
    screenOptions={{
      ...stackScreenOptions,
      ...homeScreenOptions,
    }}>
    <Stack.Screen
      component={BestWishes21Screen}
      name={routes.bestWishes21.name}
      options={routes.bestWishes21.options}
    />
    <Stack.Screen
      component={HomeScreen}
      name={routes.home.name}
      options={routes.home.options}
    />
    {getSharedScreens(Stack)}
  </Stack.Navigator>
)
