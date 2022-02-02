import {getFocusedRouteNameFromRoute} from '@react-navigation/native'
import {Platform} from 'react-native'
import {routes} from '../app/navigation/routes'

const tabHiddenRoutes = [routes.addressInfo.name]

export const tabBarDisplayHelper = (navigation, route) => {
  const isIos = Platform.OS === 'ios'
  const delay = isIos ? 525 : 100
  if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
    navigation.setOptions({
      tabBarStyle: {display: 'none'},
    })
  } else {
    setTimeout(() => {
      navigation.setOptions({
        tabBarStyle: {display: 'flex'},
      })
    }, delay)
  }
}
