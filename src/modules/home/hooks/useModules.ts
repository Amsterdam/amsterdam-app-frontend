import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGetModulesQuery} from '@/modules/home/services'
import {initializeModules, selectModules} from '@/modules/home/store'
import {clientModules} from '@/modules/index'
import {Module} from '@/modules/types'
import {mergeModulesConfig} from '@/utils'

export const useModules = () => {
  const dispatch = useDispatch()
  const {
    moduleServerConfig,
    modulesSlug,
    isLoading: isLoadingModules,
  } = useGetModulesQuery(undefined, {
    selectFromResult: ({data, isLoading}) => ({
      isLoading,
      moduleServerConfig: data,
      modulesSlug: data?.map(s => s.slug),
    }),
  })
  const {modules: selectedModulesBySlug} = useSelector(selectModules)
  const [modules, setModules] = useState<Module[]>()

  useEffect(() => {
    if (modulesSlug && selectedModulesBySlug === undefined) {
      dispatch(initializeModules(modulesSlug))
    }
  }, [dispatch, modulesSlug, selectedModulesBySlug])

  useEffect(() => {
    moduleServerConfig &&
      setModules(mergeModulesConfig(clientModules, moduleServerConfig))
  }, [moduleServerConfig])

  const getActiveModules = useCallback(
    () => modules && modules.filter(m => m.status === 1),
    [modules],
  )

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
    moduleServerConfig,
    selectedModulesBySlug,
  }
}
