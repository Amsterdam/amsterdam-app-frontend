import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {BestWishes21Screen, HomeScreen} from '../../../screens'
import {homeScreenOptions} from '../screenOptions'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const {bestWishes21, home} = homeScreenOptions
  return (
    <Stack.Navigator>
      <Stack.Screen component={HomeScreen} name="Home" options={home.options} />
      <Stack.Screen
        component={BestWishes21Screen}
        name="BestWishes21"
        options={bestWishes21.options}
      />
    </Stack.Navigator>
  )
}
