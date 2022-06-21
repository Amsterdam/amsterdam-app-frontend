import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '../../app/navigation'
import {templateRoutes} from './routes'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const TemplateStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={templateRoutes.Home.name}
      screenOptions={screenOptions(theme)}>
      {Object.entries(templateRoutes).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
