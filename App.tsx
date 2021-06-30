import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {HomeScreen, ProjectsScreen, ReportScreen} from './src/screens'

export type RootStackParamList = {
  Home: undefined
  Projects: undefined
  Report: {uri: string}
}

export const App = () => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Projects"
          component={ProjectsScreen}
          options={{title: 'Bouwprojecten'}}
        />
        <Stack.Screen
          name="Report"
          component={ReportScreen}
          options={{title: 'Melding'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
