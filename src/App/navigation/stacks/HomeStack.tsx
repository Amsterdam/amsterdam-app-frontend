import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {HomeScreen} from '../../../screens'
import {homeScreenOptions} from '../screenOptions'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const {home} = homeScreenOptions
  return (
    <Stack.Navigator>
      <Stack.Screen component={HomeScreen} name="Home" options={home.options} />
    </Stack.Navigator>
  )
}
