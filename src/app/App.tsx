import {StatusBar, StyleSheet} from 'react-native'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {CustomErrorBoundary} from '@/app/CustomErrorBoundary'
import {Init} from '@/app/Init'
import {UpdateScreen} from '@/app/UpdateScreen'
import {AppNavigationContainer} from '@/app/navigation/AppNavigationContainer'
import {RootStackNavigator} from '@/app/navigation/RootStackNavigator'
import {AppInsightsProvider} from '@/providers/appinsights.provider'
import {RootProvider} from '@/providers/root.provider'
import {store} from '@/store/store'
import {lightColorTokens} from '@/themes/tokens/color-light'
import '@/processes/logging'

const persistor = persistStore(store)

export const App = () => (
  <AppInsightsProvider>
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
          <PersistGate
            loading={null}
            persistor={persistor}>
            <UpdateScreen>
              <AppNavigationContainer>
                <Init>
                  <CustomErrorBoundary>
                    <RootStackNavigator />
                  </CustomErrorBoundary>
                </Init>
              </AppNavigationContainer>
            </UpdateScreen>
          </PersistGate>
        </RootProvider>
      </CustomErrorBoundary>
    </SafeAreaProvider>
  </AppInsightsProvider>
)

const styles = StyleSheet.create({
  appContainer: {
    // This is needed to prevent black flashing screen between splash screen when using dark-mode on iOS
    backgroundColor: lightColorTokens.screen.background.default,
  },
})
