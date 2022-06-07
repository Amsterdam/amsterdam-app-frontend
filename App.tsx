import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import {wrap as SentryWrap} from '@sentry/react-native'
import React, {useRef} from 'react'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {
  linking,
  RootStackParamList,
  RootStackNavigator,
} from './src/app/navigation'
import {Init} from './src/components/features/Init'
import {RootProvider} from './src/providers'
import {initSentry, registerNavigationContainer} from './src/services'
import {store} from './src/store'

const persistor = persistStore(store)

initSentry()

const AppComponent = () => {
  const navigation = useRef<NavigationContainerRef<RootStackParamList>>(null)
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer
        linking={linking}
        ref={navigation}
        onReady={() => {
          registerNavigationContainer(navigation)
        }}>
        <RootProvider>
          <PersistGate loading={null} persistor={persistor}>
            <Init />
            <RootStackNavigator />
          </PersistGate>
        </RootProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export const App = SentryWrap(AppComponent)
