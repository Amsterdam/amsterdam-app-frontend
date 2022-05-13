import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {SettingsScreen} from './Screen'
import {settingsRoutes} from './routes'

const Stack = createStackNavigator()

export const SettingsStack = () => {
  const {theme} = useContext(ThemeContext)
  const {settings} = settingsRoutes

  return (
    <Stack.Navigator
      initialRouteName={settings.name}
      screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        component={SettingsScreen}
        name={settings.name}
        options={settings.options}
      />
    </Stack.Navigator>
  )
}
