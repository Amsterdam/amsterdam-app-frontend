import {NavigationState, ParamListBase} from '@react-navigation/core'
import {usePiwik} from '@/hooks/usePiwik'

export const useHandleNavigationStateChange = () => {
  const piwik = usePiwik()

  return (state?: NavigationState<ParamListBase>) => {
    if (!state?.index || !state.routes[state.index].name) {
      return
    }

    void piwik?.trackScreen(state.routes[state.index].name)
  }
}
