import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '@/app/navigation'
import {templateScreenConfig} from '@/modules/template/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const TemplateStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={templateScreenConfig.Home.name}
      screenOptions={screenOptions(theme)}>
      {Object.entries(templateScreenConfig).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
