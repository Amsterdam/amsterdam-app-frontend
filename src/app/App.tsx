import {ErrorBoundary, wrap as SentryWrap} from '@sentry/react-native'
import {ReactNode} from 'react'
import {StatusBar, StyleSheet} from 'react-native'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import {PersistGate} from 'redux-persist/integration/react'
import {CustomErrorBoundary, Init} from '@/app'
import {AppNavigationContainer, RootStackNavigator} from '@/app/navigation'
import {ErrorWithRestart} from '@/components/ui/feedback'
import {RootProvider} from '@/providers'
import {useStoreAndPersistor} from '@/store/store'
import {lightColorTokens} from '@/themes/tokens'

type StoreInitProps = {children: ReactNode}

const StoreInit = ({children}: StoreInitProps) => {
  const {store, persistor} = useStoreAndPersistor()

  if (!store || !persistor) {
    return null
  }

  return (
    <RootProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </RootProvider>
  )
}

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
      <StoreInit>
        <AppNavigationContainer>
          <Init>
            <ErrorBoundary fallback={<ErrorWithRestart />}>
              <RootStackNavigator />
            </ErrorBoundary>
          </Init>
        </AppNavigationContainer>
      </StoreInit>
    </CustomErrorBoundary>
  </SafeAreaProvider>
)

export const App = SentryWrap(AppComponent)

const styles = StyleSheet.create({
  appContainer: {
    // This is needed to prevent black flashing screen between splash screen and welcome screen when using dark-mode on iOS
    backgroundColor: lightColorTokens.screen.background.default,
  },
})
