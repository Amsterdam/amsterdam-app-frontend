import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {TabNavigator} from './src/App/navigation/TabNavigator'
import {linking} from './src/App/navigation/linking'

export const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer linking={linking}>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
