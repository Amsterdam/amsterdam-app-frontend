import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import ProjectScreen from './src/screens/Project'
import HomeScreen from './src/screens/Home'
import MeldingScreen from './src/screens/Melding'

export type RootStackParamList = {
  Project: undefined
  Home: undefined
  Melding: {uri: string}
}

const App = () => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Melding" component={MeldingScreen} />
        <Stack.Screen name="Project" component={ProjectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
