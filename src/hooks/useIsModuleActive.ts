import {useState, useEffect} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {useGetReleaseQuery} from '@/services/modules.service'

export const useIsModuleActive = (moduleSlug: ModuleSlug) => {
  const {navigate} = useNavigation()

  const {data: release} = useGetReleaseQuery()
  const [isModuleActive, setModuleActive] = useState<boolean>()

  useEffect(() => {
    const currentModule = release?.modules.find(
      module => module.moduleSlug === moduleSlug,
    )

    if (currentModule?.status === 1) {
      setModuleActive(true)
    } else {
      setModuleActive(false)
    }
  }, [moduleSlug, navigate, release?.modules])

  return isModuleActive
}

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
