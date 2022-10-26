import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '@/app/navigation'
import {WelcomeRouteName} from '@/modules/welcome/routes'
import {screenConfig} from '@/modules/welcome/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const WelcomeStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={WelcomeRouteName.welcome}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
