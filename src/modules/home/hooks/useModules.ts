import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGetModulesForAppQuery} from '@/modules/home/services'
import {initializeModules, selectModules} from '@/modules/home/store'
import {clientModules} from '@/modules/index'
import {Module} from '@/modules/types'
import {mergeModulesConfig} from '@/utils'

export const useModules = () => {
  const dispatch = useDispatch()
  const {data: modulesFromApi, isLoading: isLoadingModules} =
    useGetModulesForAppQuery()
  const {modules: selectedModulesBySlug} = useSelector(selectModules)
  const modules = mergeModulesConfig(clientModules, modulesFromApi)
  const selectedModules: Module[] = modules.filter(m =>
    selectedModulesBySlug?.includes(m.slug),
  )

  // Wait for modules to be fetched and initialize a list of module slugs
  useEffect(() => {
    if (modulesFromApi && selectedModulesBySlug === undefined) {
      dispatch(initializeModules(modulesFromApi.map(module => module.slug)))
    }
  }, [dispatch, modulesFromApi, selectedModulesBySlug])

  return {
    isLoadingModules,
    modules,
    selectedModules,
    selectedModulesBySlug,
  }
}
