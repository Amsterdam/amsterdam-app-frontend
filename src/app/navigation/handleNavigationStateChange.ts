import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk'
import {NavigationState, ParamListBase} from '@react-navigation/core'

export const handleNavigationStateChange = async (
  state?: NavigationState<ParamListBase>,
) => {
  if (!state?.key) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await PiwikProSdk.trackScreen(state.routes[state.index].name, {
    key: state.key,
    history: state.history,
  })
}
