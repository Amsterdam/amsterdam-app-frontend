import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {UserRouteName} from './routes'
import {userScreenConfig as routes} from './screenConfig'
import {screenOptions} from '@/app/navigation'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const UserStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={UserRouteName.user}
      screenOptions={screenOptions(theme, {
        screenType: 'settings',
      })}>
      {Object.entries(routes).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
