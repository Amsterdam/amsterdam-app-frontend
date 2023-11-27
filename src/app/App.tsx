import {ErrorBoundary, wrap as SentryWrap} from '@sentry/react-native'
import {StatusBar, StyleSheet} from 'react-native'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {CustomErrorBoundary} from '@/app/CustomErrorBoundary'
import {Init} from '@/app/Init'
import {AppNavigationContainer} from '@/app/navigation/AppNavigationContainer'
import {RootStackNavigator} from '@/app/navigation/RootStackNavigator'
import {ErrorWithRestart} from '@/components/ui/feedback/ErrorWithRestart'
import {RootProvider} from '@/providers/root.provider'
import {store} from '@/store/store'
import {lightColorTokens} from '@/themes/tokens/color-light'
import '@/processes/logging'

const persistor = persistStore(store)

const AppComponent = () => (
  <SafeAreaProvider
    initialMetrics={initialWindowMetrics}
    style={styles.appContainer}>
    <CustomErrorBoundary>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <RootProvider>
        <AppNavigationContainer>
          <PersistGate
            loading={null}
            persistor={persistor}>
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
    // This is needed to prevent black flashing screen between splash screen when using dark-mode on iOS
    backgroundColor: lightColorTokens.screen.background.default,
  },
})
