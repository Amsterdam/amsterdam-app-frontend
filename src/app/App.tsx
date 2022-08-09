import {useFlipper} from '@react-navigation/devtools'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import {ErrorBoundary, wrap as SentryWrap} from '@sentry/react-native'
import React from 'react'
import {StatusBar} from 'react-native'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {linking, RootStackNavigator, RootStackParams} from '@/app/navigation'
import {CustomErrorBoundary, Init} from '@/components/features'
import {ErrorWithRestart} from '@/components/ui/ErrorWithRestart'
import {registerNavigationContainer} from '@/processes'
import {RootProvider} from '@/providers'
import {store} from '@/store'
import {lightColorTokens} from '@/themes/tokens'

const persistor = persistStore(store)

const AppComponent = () => {
  const navigation = useNavigationContainerRef<RootStackParams>()
  useFlipper(navigation)
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <CustomErrorBoundary>
        <StatusBar
          backgroundColor={lightColorTokens.screen.background.default}
          barStyle="dark-content"
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
