import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {SettingsScreen} from './Screen'
import {settingsRoutes} from './routes'

const Stack = createStackNavigator()

export const SettingsStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={settingsRoutes.settings.name}
      screenOptions={stackScreenOptions(theme, {
        headerBackgroundColor: '#f3f5f7', // TODO Token
      })}>
      <Stack.Screen
        component={SettingsScreen}
        name={settingsRoutes.settings.name}
        options={settingsRoutes.settings.options}
      />
    </Stack.Navigator>
  )
}
