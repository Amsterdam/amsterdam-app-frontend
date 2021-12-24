import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {stackScreenOptions} from '..'
import {BestWishes21Screen, HomeScreen} from '../../../screens'
import {AddressFormScreen} from '../../../screens/modals/AddressFormScreen'
import {homeScreenOptions} from '../screenOptions'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const {addressForm, bestWishes21, home} = homeScreenOptions
  return (
    <Stack.Navigator
      initialRouteName={home.name}
      screenOptions={stackScreenOptions}>
      <Stack.Screen component={HomeScreen} name="Home" options={home.options} />
      <Stack.Screen
        component={AddressFormScreen}
        name={addressForm.name}
        options={addressForm.options}
      />
      <Stack.Screen
        component={BestWishes21Screen}
        name="BestWishes21"
        options={bestWishes21.options}
      />
    </Stack.Navigator>
  )
}
