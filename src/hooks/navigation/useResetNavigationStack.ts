import {useCallback} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'

/**
 *
 * Resets the navigation state to a previous route.
 * @returns A function that resets the navigation state to go to a previous route.
 * @param routeIndex The index of the route to reset to. Defaults to 1.
 * @param routeName The name of the route to reset to.
 */
export const useResetNavigationStack = (routeIndex = 1, routeName?: string) => {
  const navigation = useNavigation()

  const {routes, key, routeNames, type} = navigation.getState()
  const targetRouteIndex = routeName
    ? routes.findIndex(route => route.name === routeName)
    : routeIndex

  const newRoutes = routes.slice(0, targetRouteIndex + 1)

  return useCallback(() => {
    navigation.reset({
      index: newRoutes.length - 1,
      routes: newRoutes,
      stale: false,
      key,
      routeNames,
      type,
    })
  }, [navigation, newRoutes, key, routeNames, type])
}
