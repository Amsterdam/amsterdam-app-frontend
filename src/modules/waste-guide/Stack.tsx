import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {WasteGuideRouteName} from './routes'
import {wasteGuideScreenConfig} from './screenConfig'
import {screenOptions} from '@/app/navigation'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const WasteGuideStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={WasteGuideRouteName.wasteMenu}
      screenOptions={screenOptions(theme)}>
      {Object.entries(wasteGuideScreenConfig).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
