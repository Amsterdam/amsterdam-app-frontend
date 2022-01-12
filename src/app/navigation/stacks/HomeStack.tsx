import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {getSharedScreens, HeaderNavigation, stackScreenOptions} from '..'
import {BestWishes21Screen, HomeScreen} from '../../../screens'
import {homeRoutes} from '../routes'

const Stack = createStackNavigator()

const homeScreenOptions: StackNavigationOptions = {
  headerRight: () => <HeaderNavigation />,
}

export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName={homeRoutes.home.name}
    screenOptions={{
      ...stackScreenOptions,
      ...homeScreenOptions,
    }}>
    <Stack.Screen
      component={BestWishes21Screen}
      name={homeRoutes.bestWishes21.name}
      options={homeRoutes.bestWishes21.options}
    />
    <Stack.Screen
      component={HomeScreen}
      name={homeRoutes.home.name}
      options={homeRoutes.home.options}
    />
    {getSharedScreens(Stack)}
  </Stack.Navigator>
)
