import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {HeaderNavigation, stackScreenOptions} from '../../app/navigation'
import {HomeScreen} from './Screen'
import {homeRoutes} from './routes'

const Stack = createStackNavigator()

const homeScreenOptions: StackNavigationOptions = {
  headerRight: () => <HeaderNavigation />,
}

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={homeRoutes.home.name}
      screenOptions={{
        ...stackScreenOptions,
      }}>
      <Stack.Screen
        component={HomeScreen}
        name={homeRoutes.home.name}
        options={{...homeRoutes.home.options, ...homeScreenOptions}}
      />
    </Stack.Navigator>
  )
}
