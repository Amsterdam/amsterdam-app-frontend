import {useCallback} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ModuleSlug} from '@/modules/slugs'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

type UserRoute = ConstructionWorkRouteName.user | WasteGuideRouteName.user

const moduleSlugToUserScreenRouteMap: Partial<Record<ModuleSlug, UserRoute>> = {
  [ModuleSlug['construction-work']]: ConstructionWorkRouteName.user,
  [ModuleSlug['waste-guide']]: WasteGuideRouteName.user,
}

export const useNavigateToUserScreenForModule = (slug: ModuleSlug) => {
  const {navigate} = useNavigation()

  const route = moduleSlugToUserScreenRouteMap[slug]

  return useCallback(() => {
    if (!route) {
      return
    }

    navigate(route)
  }, [navigate, route])
}
