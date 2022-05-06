import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {HomeScreen} from './Screen'
import {homeRoutes} from './routes'

const Stack = createStackNavigator()

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={homeRoutes.home.name}
      screenOptions={stackScreenOptions}>
      <Stack.Screen
        component={HomeScreen}
        name={homeRoutes.home.name}
        options={homeRoutes.home.options}
      />
    </Stack.Navigator>
  )
}
