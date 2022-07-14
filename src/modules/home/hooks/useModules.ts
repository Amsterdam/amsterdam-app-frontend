import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useGetModulesForAppQuery} from '@/modules/home/services'
import {selectDisabledModules} from '@/modules/home/store'
import {clientModules} from '@/modules/index'
import {ModuleServerConfig} from '@/modules/types'
import {mergeModulesConfig} from '@/utils'

const postProcessModules = (
  disabledModulesBySlug: string[],
  modulesFromApi?: ModuleServerConfig[],
) => {
  const modules = mergeModulesConfig(clientModules, modulesFromApi)
  const selectedModules = modules.filter(
    module => !disabledModulesBySlug?.includes(module.slug),
  )
  return {
    modules,
    selectedModules,
    selectedModulesBySlug: selectedModules.map(module => module.slug),
  }
}

export const useModules = () => {
  const {
    data: modulesFromApi,
    isLoading,
    isSuccess,
  } = useGetModulesForAppQuery()

  const {disabledModules: disabledModulesBySlug} = useSelector(
    selectDisabledModules,
  )

  const [modulesData, setModulesData] = useState(
    postProcessModules(disabledModulesBySlug, modulesFromApi),
  )

  useEffect(() => {
    setModulesData(postProcessModules(disabledModulesBySlug, modulesFromApi))
  }, [disabledModulesBySlug, modulesFromApi])

  // this prevents the situation where an empty modules array is returned when isLoading is false
  // we should fix this later by handling the async nature of requests in a better way
  const isLoadingModules =
    isLoading || (isSuccess && modulesData.modules.length === 0)

  return {
    isLoadingModules,
    ...modulesData,
  }
}
