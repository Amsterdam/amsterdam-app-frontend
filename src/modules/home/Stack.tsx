import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '@/app/navigation'
import {HomeRouteName} from '@/modules/home/routes'
import {screenConfig} from '@/modules/home/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const HomeStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={HomeRouteName.home}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
          options={
            route.name === HomeRouteName.settings
              ? {
                  ...screenOptions(theme, {screenType: 'settings'}),
                  ...route.options,
                }
              : route.options
          }
        />
      ))}
    </Stack.Navigator>
  )
}
