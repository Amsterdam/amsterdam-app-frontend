import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '../../app/navigation'
import {WasteGuideRouteName, wasteGuideRoutes} from './routes'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const WasteGuideStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={WasteGuideRouteName.wasteMenu}
      screenOptions={screenOptions(theme)}>
      {Object.entries(wasteGuideRoutes).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
