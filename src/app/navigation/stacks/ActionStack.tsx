import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {getSharedScreens, stackScreenOptions} from '../'
import {ReportIssueScreen} from '../../../screens/report'
import {routes} from '../routes'

const Stack = createStackNavigator()

export const ActionStack = () => (
  <Stack.Navigator
    initialRouteName={routes.reportIssue.name}
    screenOptions={stackScreenOptions}>
    <Stack.Screen
      component={ReportIssueScreen}
      name={routes.reportIssue.name}
      options={routes.reportIssue.options}
    />
    {getSharedScreens(Stack)}
  </Stack.Navigator>
)
