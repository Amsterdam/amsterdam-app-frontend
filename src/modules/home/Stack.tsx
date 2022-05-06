import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {HomeScreen} from './Screen'
import {homeRoutes} from './routes'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const {home} = homeRoutes
  return (
    <Stack.Navigator
      initialRouteName={home.name}
      screenOptions={stackScreenOptions}>
      <Stack.Screen
        component={HomeScreen}
        name={home.name}
        options={home.options}
      />
    </Stack.Navigator>
  )
}
