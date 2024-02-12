import {NavigationState} from '@react-navigation/core'
import {RootStackParams} from '@/app/navigation/types'
import {ModuleSlug} from '@/modules/slugs'

export const getCurrentModuleSlugFromNavigationRootState = (
  state: NavigationState<RootStackParams>,
): ModuleSlug | undefined => {
  const routes = state?.routes

  if (routes) {
    for (let i = routes.length - 1; i >= 0; i--) {
      const moduleSlug = ModuleSlug[routes[i].name as keyof typeof ModuleSlug]

      if (moduleSlug) {
        return moduleSlug
      }
    }
  }

  return undefined
}
