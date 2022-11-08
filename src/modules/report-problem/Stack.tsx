import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '@/app/navigation'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {screenConfig} from '@/modules/report-problem/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const ReportProblemStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={ReportProblemRouteName.reportProblem}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
