import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {ReportIssueScreen} from '../../../screens/report'
import {reportScreenOptions, stackScreenOptions} from '../screenOptions'

const Stack = createStackNavigator()

export const ReportStack = () => {
  const {reportIssue} = reportScreenOptions
  return (
    <Stack.Navigator
      initialRouteName={reportIssue.name}
      screenOptions={stackScreenOptions}>
      <Stack.Screen
        component={ReportIssueScreen}
        name="Report"
        options={reportIssue.options}
      />
    </Stack.Navigator>
  )
}
