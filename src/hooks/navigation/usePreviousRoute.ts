import {useNavigationState} from '@react-navigation/native'

/**
 * Return a route from the navigation history, defaulting to the previous route (1 step back)
 */
export const usePreviousRoute = (stepsBack = 1) =>
  useNavigationState(({routes}) => {
    const route = routes[routes.length - 1 - stepsBack]

    // The default navigation typing wrongly assumes that you always find a route, this fixes the typing by explicitly checking for an undefined result.
    if (!route) {
      return undefined
    }

    return route
  })
