import {useMemo} from 'react'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleStatus} from '@/modules/types'
import {useGetReleaseQuery} from '@/services/modules.service'

export const useIsModuleActive = (moduleSlug: ModuleSlug) => {
  const {data: release} = useGetReleaseQuery()

  return useMemo(() => {
    const currentModule = release?.modules.find(
      module => module.moduleSlug === moduleSlug,
    )

    return currentModule?.status === ModuleStatus.active
  }, [moduleSlug, release?.modules])
}
