import {ErrorBoundary, wrap as SentryWrap} from '@sentry/react-native'
import {StatusBar, StyleSheet} from 'react-native'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {CustomErrorBoundary, Init} from '@/app'
import {AppNavigationContainer, RootStackNavigator} from '@/app/navigation'
import {ErrorWithRestart} from '@/components/ui/feedback'
import {RootProvider} from '@/providers'
import {store} from '@/store'
import {lightColorTokens} from '@/themes/tokens'

const persistor = persistStore(store)

const AppComponent = () => (
  <SafeAreaProvider
    initialMetrics={initialWindowMetrics}
    style={styles.appContainer}>
    <CustomErrorBoundary>
      <StatusBar
        backgroundColor={lightColorTokens.screen.background.default}
        barStyle="dark-content"
        translucent
      />
      <RootProvider>
        <AppNavigationContainer>
          <PersistGate loading={null} persistor={persistor}>
            <Init>
              <ErrorBoundary fallback={<ErrorWithRestart />}>
                <RootStackNavigator />
              </ErrorBoundary>
            </Init>
          </PersistGate>
        </AppNavigationContainer>
      </RootProvider>
    </CustomErrorBoundary>
  </SafeAreaProvider>
)

export const App = SentryWrap(AppComponent)

const styles = StyleSheet.create({
  appContainer: {
    // Needed to prevent black flashing screen between splash screen and welcome screen when using dark-mode on iOS
    backgroundColor: lightColorTokens.screen.background.default,
  },
})
