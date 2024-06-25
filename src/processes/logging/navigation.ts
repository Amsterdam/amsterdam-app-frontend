import {NavigationContainerRefWithCurrent, Route} from '@react-navigation/core'
import {RootStackParams} from '@/app/navigation/types'
import {devError, devLog} from '@/processes/development'
import {appInsights} from '@/providers/appinsights.provider'

type NavigationRoute = Route<string>

type NavigationContainer = NavigationContainerRefWithCurrent<RootStackParams>

/**
 * Instrumentation for React-Navigation V5 and above. See docs or sample app for usage.
 *
 * How this works:
 * - `_onDispatch` is called every time a dispatch happens and sets an IdleTransaction on the scope without any route context.
 * - `_onStateChange` is then called AFTER the state change happens due to a dispatch and sets the route context onto the active transaction.
 * - If `_onStateChange` isn't called within `STATE_CHANGE_TIMEOUT_DURATION` of the dispatch, then the transaction is not sampled and finished.
 */
export class ReactNavigationInstrumentation {
  private _navigationContainer: NavigationContainer | null = null

  private readonly _maxRecentRouteLen: number = 200

  private _latestRoute?: NavigationRoute
  private _latestTransaction?: number

  private _recentRouteKeys: string[] = []

  /**
   * Pass the ref to the navigation container to register it to the instrumentation
   * @param navigationContainerRef Ref to a `NavigationContainer`
   */

  public registerNavigationContainer(
    navigationContainerRef: NavigationContainer,
  ): void {
    /* We prevent duplicate routing instrumentation to be initialized on fast refreshes

      Explanation: If the user triggers a fast refresh on the file that the instrumentation is
      initialized in, it will initialize a new instance and will cause undefined behavior.
     */
    if (!this._navigationContainer) {
      if ('current' in navigationContainerRef) {
        this._navigationContainer =
          navigationContainerRef.current as NavigationContainer
      } else {
        this._navigationContainer = navigationContainerRef
      }

      if (this._navigationContainer) {
        this._navigationContainer.addListener(
          '__unsafe_action__', // This action is emitted on every dispatch
          this._onDispatch.bind(this),
        )
        this._navigationContainer.addListener(
          'state', // This action is emitted on every state change
          this._onStateChange.bind(this),
        )

        // Navigation container already registered, just populate with route state
        this._onStateChange(undefined, true)
      } else {
        devError('Received invalid navigation container ref')
      }
    } else {
      devLog(
        'Instrumentation already exists, but register has been called again, doing nothing.',
      )
    }
  }

  /**
   * To be called on every React-Navigation action dispatch.
   * It does not name the transaction or populate it with route information. Instead, it waits for the state to fully change
   * and gets the route information from there, @see _onStateChange
   */
  private _onDispatch(params?: {data: {noop: boolean}}): void {
    const noop = params?.data.noop

    if (noop) {
      return
    }

    this._latestTransaction = new Date().getTime()
  }

  /**
   * To be called AFTER the state has been changed to populate the transaction with the current route.
   */
  private _onStateChange(_?: unknown, isInitialState?: boolean): void {
    // Use the getCurrentRoute method to be accurate.
    const previousRoute = this._latestRoute

    if (!this._navigationContainer) {
      devError(
        'Missing navigation container ref. Route transactions will not be sent.',
      )

      return
    }

    const route = this._navigationContainer.getCurrentRoute()

    if (route && (this._latestTransaction || isInitialState)) {
      if (!previousRoute || previousRoute.key !== route.key) {
        const routeHasBeenSeen = this._recentRouteKeys.includes(route.key)

        appInsights.trackPageView({
          name: route.name,
          uri: route.path,
          refUri: previousRoute?.name,
          properties: {
            ...(route.params ?? {}),
            duration: this._latestTransaction
              ? new Date().getTime() - this._latestTransaction
              : 0,
            routeHasBeenSeen,
          },
        })
      }

      this._pushRecentRouteKey(route.key)
      this._latestRoute = route

      // Clear the latest transaction as it has been handled.
      this._latestTransaction = undefined
    }
  }

  /** Pushes a recent route key, and removes earlier routes when there is greater than the max length */
  private _pushRecentRouteKey = (key: string): void => {
    this._recentRouteKeys.push(key)

    if (this._recentRouteKeys.length > this._maxRecentRouteLen) {
      this._recentRouteKeys = this._recentRouteKeys.slice(
        this._recentRouteKeys.length - this._maxRecentRouteLen,
      )
    }
  }
}

const routingInstrumentation = new ReactNavigationInstrumentation()

/**
 * To be used in the onReady of the NavigationContainer: register the navigation with Sentry
 */
export const registerNavigationContainer = (
  ref: NavigationContainerRefWithCurrent<RootStackParams>,
) => {
  try {
    routingInstrumentation.registerNavigationContainer(ref)
  } catch (e) {
    devLog(e)
  }
}
