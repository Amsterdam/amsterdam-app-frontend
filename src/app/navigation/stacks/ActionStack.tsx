import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {stackScreenOptions} from '../'
import {ReportIssueScreen} from '../../../screens/report'
import {actionRoutes} from '../routes'

const Stack = createStackNavigator()

export const ActionStack = () => (
  <Stack.Navigator
    initialRouteName={actionRoutes.reportIssue.name}
    screenOptions={stackScreenOptions}>
    <Stack.Screen
      component={ReportIssueScreen}
      name={actionRoutes.reportIssue.name}
      options={actionRoutes.reportIssue.options}
    />
  </Stack.Navigator>
)
