import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {SettingsScreen} from './Screen'
import {settingsRoutes} from './routes'

const Stack = createStackNavigator()

export const SettingsStack = () => {
  const {settings} = settingsRoutes
  return (
    <Stack.Navigator
      initialRouteName={settings.name}
      screenOptions={stackScreenOptions}>
      <Stack.Screen
        component={SettingsScreen}
        name={settings.name}
        options={settings.options}
      />
    </Stack.Navigator>
  )
}
