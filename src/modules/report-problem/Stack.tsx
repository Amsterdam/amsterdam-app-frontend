import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {ReportProblemScreen} from './Screen'
import {ReportProblemRouteName, reportProblemRoutes} from './routes'

const Stack = createStackNavigator()

export const ReportProblemStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={ReportProblemRouteName.home}
      screenOptions={screenOptions(theme)}>
      <Stack.Screen
        component={ReportProblemScreen}
        name={ReportProblemRouteName.home}
        options={reportProblemRoutes.Home.options}
      />
    </Stack.Navigator>
  )
}
