import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {linking, TabNavigator} from './src/app/navigation'
import {RootProvider} from './src/providers/root.provider'

export const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {/* Find out whats going on here */}
      <NavigationContainer linking={linking}>
        <RootProvider>
          <TabNavigator />
        </RootProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
