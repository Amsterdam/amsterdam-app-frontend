import {useCallback, useEffect, useState} from 'react'
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
  const [modules, setModules] = useState<Module[]>()

  // Wait for modules to be fetched and initialize a list of module slugs
  useEffect(() => {
    if (modulesFromApi && selectedModulesBySlug === undefined) {
      dispatch(initializeModules(modulesFromApi.map(module => module.slug)))
    }
  }, [dispatch, modulesFromApi, selectedModulesBySlug])

  // When modules are fetched, merge them with client config and set in state
  useEffect(() => {
    modulesFromApi &&
      setModules(mergeModulesConfig(clientModules, modulesFromApi))
  }, [modulesFromApi])

  // Callback to receive only active modules
  const getActiveModules = useCallback(
    () => modules && modules.filter(m => m.status === 1),
    [modules],
  )

  // Callback to receive slugs from selected modules only
  const getSelectedModules = useCallback(
    () =>
      modules && modules.filter(m => selectedModulesBySlug?.includes(m.slug)),
    [modules, selectedModulesBySlug],
  )

  return {
    isLoadingModules,
    modules,
    getActiveModules,
    getSelectedModules,
    selectedModulesBySlug,
  }
}
