import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import HomeScreen from './src/screens/Home'
import MeldingScreen from './src/screens/Melding'

export type RootStackParamList = {
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
