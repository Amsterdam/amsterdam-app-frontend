import {createStackNavigator} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {getSharedScreens, stackScreenOptions} from '../'
import {ReportIssueScreen} from '../../../screens/report'
import {ThemeContext} from '../../../themes'
import {routes} from '../routes'

const Stack = createStackNavigator()

export const ActionStack = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName={routes.reportIssue.name}
      screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        component={ReportIssueScreen}
        name={routes.reportIssue.name}
        options={routes.reportIssue.options}
      />
      {getSharedScreens(Stack)}
    </Stack.Navigator>
  )
}
