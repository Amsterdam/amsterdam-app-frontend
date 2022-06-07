import {NavigationContainerRef} from '@react-navigation/native'
import {
  init,
  ReactNavigationInstrumentation,
  ReactNativeTracing,
} from '@sentry/react-native'
import {RefObject} from 'react'
import {RootStackParamList} from '../app/navigation'
import {devLog} from './development'

const routingInstrumentation = new ReactNavigationInstrumentation()

export const registerNavigationContainer = (
  ref: RefObject<NavigationContainerRef<RootStackParamList>>,
) => {
  try {
    routingInstrumentation.registerNavigationContainer(ref)
  } catch (e) {
    devLog(e)
  }
}

export const initSentry = () => {
  init({
    dsn: 'https://7a6ad9f75fab4c509da16d13bbab4271@o1279066.ingest.sentry.io/6479388',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 0.1,
    integrations: [
      new ReactNativeTracing({
        // Pass instrumentation to be used as `routingInstrumentation`
        routingInstrumentation,
        // ...
      }),
    ],
  })
}
