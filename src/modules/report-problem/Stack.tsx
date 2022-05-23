import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {ReportProblemScreen} from './Screen'
import {reportProblemRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const ReportProblemStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={routes.home.name}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={ReportProblemScreen}
        name={routes.home.name}
        options={routes.home.options}
      />
    </Stack.Navigator>
  )
}
