import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {homeRoutes, stackScreenOptions} from '..'
import {
  BestWishes21Screen,
  HomeScreen,
  ProjectOverviewScreen,
  WasteScreen,
} from '../../../screens'
import {AddressFormScreen} from '../../../screens/modals/AddressFormScreen'

const Stack = createStackNavigator()

export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName={homeRoutes.home.name}
    screenOptions={stackScreenOptions}>
    <Stack.Screen
      component={AddressFormScreen}
      name={homeRoutes.addressForm.name}
      options={homeRoutes.addressForm.options}
    />
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
    <Stack.Screen
      component={ProjectOverviewScreen}
      name={homeRoutes.projectOverview.name}
      options={homeRoutes.projectOverview.options}
    />
    <Stack.Screen
      component={WasteScreen}
      name={homeRoutes.waste.name}
      options={homeRoutes.waste.options}
    />
  </Stack.Navigator>
)
