import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '@/app/navigation'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {screenConfig} from '@/modules/redirects/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const RedirectsStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={RedirectsRouteName.redirects}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
