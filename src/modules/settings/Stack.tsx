import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {SettingsScreen} from './Screen'
import {settingsRoutes} from './routes'

const Stack = createStackNavigator()

export const SettingsStack = () => {
  const {theme} = useContext(ThemeContext)
  const routes = settingsRoutes(theme)

  return (
    <Stack.Navigator
      initialRouteName={routes.settings.name}
      screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        component={SettingsScreen}
        name={routes.settings.name}
        options={routes.settings.options}
      />
    </Stack.Navigator>
  )
}
