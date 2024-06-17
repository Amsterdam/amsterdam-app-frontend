import {useEffect} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useIsModuleActive} from '@/hooks/useIsModuleActive'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'

/**
 * Navigates to the home screen if the module is inactive. E.g. to be used in screens with deep linking.
 */
export const useNavigateToHomeIfModuleInactive = (moduleSlug: ModuleSlug) => {
  const isModuleActive = useIsModuleActive(moduleSlug)
  const {navigate} = useNavigation()

  useEffect(() => {
    if (isModuleActive === false) {
      navigate(HomeRouteName.home)
    }
  }, [isModuleActive, navigate])

  return isModuleActive === undefined
}
