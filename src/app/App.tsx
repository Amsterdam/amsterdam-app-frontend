import {useFlipper} from '@react-navigation/devtools'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import {ErrorBoundary, wrap as SentryWrap} from '@sentry/react-native'
import React from 'react'
import {StatusBar, StyleSheet} from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {CustomErrorBoundary, Init} from '@/app'
import {linking, RootStackNavigator, RootStackParams} from '@/app/navigation'
import {ErrorWithRestart} from '@/components/ui/feedback'
import {registerNavigationContainer} from '@/processes'
import {RootProvider} from '@/providers'
import {store} from '@/store'
import {lightColorTokens} from '@/themes/tokens'

const persistor = persistStore(store)

const AppComponent = () => {
  const navigation = useNavigationContainerRef<RootStackParams>()
  useFlipper(navigation)

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={styles.appContainer}>
      <CustomErrorBoundary>
        <StatusBar
          backgroundColor={lightColorTokens.screen.background.default}
          barStyle="dark-content"
          translucent
        />
        <NavigationContainer
          linking={linking}
          ref={navigation}
          onReady={() => {
            registerNavigationContainer(navigation)
            void RNBootSplash.hide({fade: true})
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

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: lightColorTokens.screen.background.default, // Needed to prevent black flashing screen between splash screen and welcome screen when using dark-mode on iOS
  },
})
