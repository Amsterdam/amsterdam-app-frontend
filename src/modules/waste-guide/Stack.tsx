import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {WasteGuideScreen} from './Screen'
import {wasteGuideRoutes} from './routes'

const Stack = createStackNavigator()

export const WasteGuideStack = () => {
  const {wasteGuide} = wasteGuideRoutes
  return (
    <Stack.Navigator
      initialRouteName={wasteGuide.name}
      screenOptions={{
        ...stackScreenOptions,
      }}>
      <Stack.Screen
        component={WasteGuideScreen}
        name={wasteGuide.name}
        options={wasteGuide.options}
      />
    </Stack.Navigator>
  )
}
