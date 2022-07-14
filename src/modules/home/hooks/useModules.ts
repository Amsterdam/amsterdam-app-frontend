import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useGetModulesForAppQuery} from '@/modules/home/services'
import {selectDisabledModules} from '@/modules/home/store'
import {clientModules} from '@/modules/index'
import {ModuleServerConfig} from '@/modules/types'
import {mergeModulesConfig} from '@/utils'

const postProcessModules = (
  disabledModulesBySlug: string[],
  serverModules?: ModuleServerConfig[],
) => {
  const modules = mergeModulesConfig(clientModules, serverModules)
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
  const {data: serverModules, isLoading, isSuccess} = useGetModulesForAppQuery()

  const {disabledModules: disabledModulesBySlug} = useSelector(
    selectDisabledModules,
  )

  const [postProcessedModules, setPostProcessedModules] = useState(
    postProcessModules(disabledModulesBySlug, serverModules),
  )

  useEffect(() => {
    setPostProcessedModules(
      postProcessModules(disabledModulesBySlug, serverModules),
    )
  }, [disabledModulesBySlug, serverModules])

  // this prevents the situation where an empty modules array is returned when isLoading is false
  // we should fix this later by handling the async nature of requests in a better way
  const isLoadingModules =
    isLoading || (isSuccess && postProcessedModules.modules.length === 0)

  return {
    isLoadingModules,
    ...postProcessedModules,
  }
}
