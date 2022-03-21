import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {linking, TabNavigator} from './src/app/navigation'
import {Init} from './src/components/features/Init'
import {RootProvider} from './src/providers'

export const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {/* Find out whats going on here */}
      <NavigationContainer linking={linking}>
        <RootProvider>
          <Init />
          <TabNavigator />
        </RootProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
