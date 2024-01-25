import {NavigationState} from '@react-navigation/core'
import {RootStackParams} from '@/app/navigation/types'
import {usePiwik} from '@/hooks/piwik/usePiwik'

/**
 * We use this to set the screen title for screens with variable content (i.e. a project, for which the title comes from the backend).
 * If we use this consistently, we can add the screen title when logging a screen view.
 */
export const SCREEN_TITLE_PARAM_KEY = 'navigationScreenTitle'

const getScreenTitleFromParams = (params?: Record<string, unknown>) => {
  if (!params?.[SCREEN_TITLE_PARAM_KEY]) {
    return
  }

  return !params?.[SCREEN_TITLE_PARAM_KEY] as unknown as string
}

export const useHandleNavigationStateChange = () => {
  const {trackScreen} = usePiwik()

  return (navState?: NavigationState) => {
    // This cast fixes a typing issue: the NavigationContainer onStateChange prop will incorrectly not accept a function that handles state of type NavigationState<RootStackParams>
    const state = navState as NavigationState<RootStackParams>

    if (!state?.index || !state.routes[state.index]?.name) {
      return
    }

    const screenTitleFromParams = getScreenTitleFromParams(
      state.routes[state.index].params,
    )

    trackScreen(state.routes[state.index].name, {
      title: screenTitleFromParams,
    })
  }
}
