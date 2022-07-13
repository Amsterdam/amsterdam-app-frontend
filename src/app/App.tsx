import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import {ErrorBoundary, wrap as SentryWrap} from '@sentry/react-native'
import React, {useRef} from 'react'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {linking, RootStackParams, RootStackNavigator} from '@/app/navigation'
import {Init, CustomErrorBoundary} from '@/components/features'
import {ErrorWithRestart} from '@/components/ui/ErrorWithRestart'
import {registerNavigationContainer} from '@/processes'
import {RootProvider} from '@/providers'
import {store} from '@/store'
import {baseColor} from '@/tokens'

const persistor = persistStore(store)

const AppComponent = () => {
  const navigation = useRef<NavigationContainerRef<RootStackParams>>(null)
  return (
    <SafeAreaProvider>
      <CustomErrorBoundary>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={baseColor.primary.white}
        />
        <NavigationContainer
          linking={linking}
          ref={navigation}
          onReady={() => {
            registerNavigationContainer(navigation)
          }}>
          <RootProvider>
            <PersistGate loading={null} persistor={persistor}>
              <Init>
                <ErrorBoundary fallback={<ErrorWithRestart />}>
                  <RootStackNavigator />
                </ErrorBoundary>
              </Init>
            </PersistGate>
          </RootProvider>
        </NavigationContainer>
      </CustomErrorBoundary>
    </SafeAreaProvider>
  )
}

export const App = SentryWrap(AppComponent)
