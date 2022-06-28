import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {ContactRouteName} from './routes'
import {contactScreenConfig as routes} from './screenConfig'
import {screenOptions} from '@/app/navigation'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const ContactStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={ContactRouteName.contact}
      screenOptions={screenOptions(theme)}>
      {Object.entries(routes).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
