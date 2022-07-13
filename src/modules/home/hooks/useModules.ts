import {useSelector} from 'react-redux'
import {useGetModulesForAppQuery} from '@/modules/home/services'
import {selectDisabledModules} from '@/modules/home/store'
import {clientModules} from '@/modules/index'
import {Module} from '@/modules/types'
import {mergeModulesConfig} from '@/utils'

export const useModules = () => {
  const {data: modulesFromApi, isLoading: isLoadingModules} =
    useGetModulesForAppQuery()
  const {disabledModules: disabledModulesBySlug} = useSelector(
    selectDisabledModules,
  )
  const modules = mergeModulesConfig(clientModules, modulesFromApi)
  const selectedModules: Module[] = modules.filter(
    module => !disabledModulesBySlug?.includes(module.slug),
  )
  const selectedModulesBySlug = selectedModules.map(module => module.slug)

  return {
    isLoadingModules,
    modules,
    selectedModules,
    selectedModulesBySlug,
  }
}
