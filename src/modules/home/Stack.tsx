import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {homeRoutes} from './routes'
import {HomeScreen, SettingsScreen} from './screens'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const {theme} = useSelector(selectTheme)
  const {home, settings} = homeRoutes(theme)

  return (
    <Stack.Navigator
      initialRouteName={home.name}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={HomeScreen}
        name={home.name}
        options={home.options}
      />
      <Stack.Screen
        component={SettingsScreen}
        name={settings.name}
        options={settings.options}
      />
    </Stack.Navigator>
  )
}
