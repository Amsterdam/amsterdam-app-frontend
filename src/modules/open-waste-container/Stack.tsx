import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {OpenWasteContainerRouteName} from './routes'
import {openWasteContainerScreenConfig as routes} from './screenConfig'
import {screenOptions} from '@/app/navigation'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const OpenWasteContainerStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={OpenWasteContainerRouteName.openWasteContainer}
      screenOptions={screenOptions(theme)}>
      {Object.entries(routes).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
