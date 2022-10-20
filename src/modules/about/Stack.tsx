import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '@/app/navigation'
import {AboutRouteName} from '@/modules/about/routes'
import {screenConfig} from '@/modules/about/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const AboutStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={AboutRouteName.about}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
