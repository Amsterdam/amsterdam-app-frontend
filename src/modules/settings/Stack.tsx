import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {SettingsScreen} from './Screen'
import {settingsRoutes} from './routes'

const Stack = createStackNavigator()

export const SettingsStack = () => {
  const {theme} = useSelector(selectTheme)
  const routes = settingsRoutes(theme)

  return (
    <Stack.Navigator
      initialRouteName={routes.settings.name}
      screenOptions={screenOptions(theme, {
        screenType: 'settings',
      })}>
      <Stack.Screen
        component={SettingsScreen}
        name={routes.settings.name}
        options={routes.settings.options}
      />
    </Stack.Navigator>
  )
}
