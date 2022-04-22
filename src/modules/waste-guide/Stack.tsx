import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {WasteGuideModuleScreen} from './WasteGuideModuleScreen'
import {routes} from './routes'

const Stack = createStackNavigator()

export const WasteGuideModuleStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      component={WasteGuideModuleScreen}
      name={routes.wasteGuideModule.name}
      options={routes.wasteGuideModule.options}
    />
  </Stack.Navigator>
)
