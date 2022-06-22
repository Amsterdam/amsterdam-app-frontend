import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '../../app/navigation'
import {ReportProblemRouteName, reportProblemRoutes as routes} from './routes'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const ReportProblemStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={ReportProblemRouteName.reportProblem}
      screenOptions={screenOptions(theme)}>
      {Object.entries(routes).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
