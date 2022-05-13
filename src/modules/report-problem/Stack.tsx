import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {stackScreenOptions} from '../../app/navigation'
import {ThemeContext} from '../../themes'
import {ReportProblemScreen} from './Screen'
import {reportProblemRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const ReportProblemStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        component={ReportProblemScreen}
        name={routes.home.name}
        options={routes.home.options}
      />
    </Stack.Navigator>
  )
}
