import {NavigationContainerRefWithCurrent, Route} from '@react-navigation/core'
import {useRef, useCallback} from 'react'
import {RootStackParams} from '@/app/navigation/types'
import {devError, devLog} from '@/processes/development'
import {appInsights} from '@/providers/appinsights.provider'

type NavigationRoute = Route<string>

type NavigationContainer = NavigationContainerRefWithCurrent<RootStackParams>

export class ReactNavigationLogging {
  private _navigationContainer?: NavigationContainer

  private readonly _maxRecentRouteLen: number = 200

  private _latestRoute?: NavigationRoute
  private _navigationStartTime?: number

  private _recentRouteKeys: string[] = []

  /**
   * Pass the ref to the navigation container to register it for logging
   * @param navigationContainerRef Ref to a `NavigationContainer`
   */
  public registerNavigationContainer(
    navigationContainerRef: NavigationContainer,
  ): void {
    // only register the navigation container once
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
   * This method is responsible for storing the start time of every React-Navigation action dispatch.
   */
  private _onDispatch(params?: {data: {noop: boolean}}): void {
    const noop = params?.data.noop

    if (noop) {
      return
    }

    this._navigationStartTime = new Date().getTime()
  }

  /**
   * This method is responsible for saving the new navigation state as screen view
   */
  private _onStateChange(_?: unknown, isInitialState = false): void {
    // Use the getCurrentRoute method to be accurate.
    const previousRoute = this._latestRoute

    if (!this._navigationContainer) {
      devError(
        'Missing navigation container ref. Route transactions will not be sent.',
      )

      return
    }

    const route = this._navigationContainer.getCurrentRoute()

    if (route && (this._navigationStartTime || isInitialState)) {
      if (!previousRoute || previousRoute.key !== route.key) {
        const routeHasBeenSeen = this._recentRouteKeys.includes(route.key)

        appInsights.trackPageView({
          name: route.name,
          uri: route.path,
          refUri: previousRoute?.name,
          properties: {
            ...(route.params ?? {}),
            duration: this._navigationStartTime
              ? new Date().getTime() - this._navigationStartTime
              : undefined,
            routeHasBeenSeen,
          },
        })
      }

      this._pushRecentRouteKey(route.key)
      this._latestRoute = route

      this._navigationStartTime = undefined
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

const routingInstrumentation = new ReactNavigationLogging()

/**
 * To be used in the onReady of the NavigationContainer: register the navigation actions for logging
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

const MAX_RECENT_ROUTE_LENGTH = 200

export const useRegisterNavigationContainer = () => {
  const navigationContainer = useRef<NavigationContainer>()
  const navigationStartTime = useRef<number>()
  const recentRouteKeys = useRef<string[]>([])
  const latestRoute = useRef<Route<string>>()

  /**
   * This method is responsible for storing the start time of every React-Navigation action dispatch.
   */
  const onDispatch = useCallback((params?: {data: {noop: boolean}}): void => {
    const noop = params?.data.noop

    if (noop) {
      return
    }

    navigationStartTime.current = new Date().getTime()
  }, [])

  /**
   * The `_pushRecentRouteKey` method is responsible for adding a new route key to the list of recent route keys stored in the `_recentRouteKeys` array.
   * If the number of route keys exceeds the maximum allowed length specified by `_maxRecentRouteLen`, it will trim the array to keep only the most recent route keys based on the maximum length.
   */
  const pushRecentRouteKey = useCallback((key: string): void => {
    recentRouteKeys.current.push(key)

    if (recentRouteKeys.current.length > MAX_RECENT_ROUTE_LENGTH) {
      recentRouteKeys.current = recentRouteKeys.current.slice(
        recentRouteKeys.current.length - MAX_RECENT_ROUTE_LENGTH,
      )
    }
  }, [])

  /**
   * This method is responsible for saving the new navigation state as screen view
   */
  const onStateChange = useCallback(
    (_?: unknown, isInitialState = false): void => {
      const previousRoute = latestRoute.current

      if (!navigationContainer.current) {
        devError(
          'Missing navigation container ref. Route transactions will not be sent.',
        )

        return
      }

      const route = navigationContainer.current.getCurrentRoute()

      if (route && (navigationStartTime.current || isInitialState)) {
        if (!previousRoute || previousRoute.key !== route.key) {
          const routeHasBeenSeen = recentRouteKeys.current.includes(route.key)

          appInsights.trackPageView({
            name: route.name,
            uri: route.path,
            refUri: previousRoute?.name,
            properties: {
              ...(route.params ?? {}),
              duration: navigationStartTime.current
                ? new Date().getTime() - navigationStartTime.current
                : undefined,
              routeHasBeenSeen,
            },
          })
        }

        pushRecentRouteKey(route.key)
        latestRoute.current = route

        navigationStartTime.current = undefined
      }
    },
    [pushRecentRouteKey],
  )

  return useCallback(
    (
      navigationContainerRef: NavigationContainerRefWithCurrent<RootStackParams>,
    ): void => {
      // only register the navigation container once
      if (!navigationContainer.current) {
        if ('current' in navigationContainerRef) {
          navigationContainer.current =
            navigationContainerRef.current as NavigationContainer
        } else {
          navigationContainer.current = navigationContainerRef
        }

        if (navigationContainer.current) {
          navigationContainer.current.addListener(
            '__unsafe_action__', // This action is emitted on every dispatch
            onDispatch.bind(this),
          )
          navigationContainer.current.addListener(
            'state', // This action is emitted on every state change
            onStateChange.bind(this),
          )

          // Navigation container already registered, just populate with route state
          onStateChange(undefined, true)
        } else {
          devError('Received invalid navigation container ref')
        }
      } else {
        devLog(
          'Instrumentation already exists, but register has been called again, doing nothing.',
        )
      }
    },
    [onDispatch, onStateChange],
  )
}
