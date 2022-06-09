import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {linking, RootStackNavigator} from './src/app/navigation'
import {Init} from './src/components/features/Init'
import {RootProvider} from './src/providers'
import {store} from './src/store'

let persistor = persistStore(store)

export const App = () => (
  <SafeAreaProvider>
    <StatusBar barStyle="dark-content" />
    <NavigationContainer linking={linking}>
      <RootProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Init />
          <RootStackNavigator />
        </PersistGate>
      </RootProvider>
    </NavigationContainer>
  </SafeAreaProvider>
)
