import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '@/app/navigation'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {wasteGuideScreenConfig} from '@/modules/waste-guide/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const WasteGuideStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={WasteGuideRouteName.wasteGuide}
      screenOptions={screenOptions(theme)}>
      {Object.entries(wasteGuideScreenConfig).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
