import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {combineClientAndServerModules} from '../../../utils'
import {clientModules} from '../../index'
import {Module} from '../../types'
import {useGetModulesQuery} from '../services'
import {initializeModules, selectModules} from '../store'

export const useModules = () => {
  const dispatch = useDispatch()
  const {
    serverModules,
    serverModulesBySlug,
    isLoading: isLoadingModules,
  } = useGetModulesQuery(undefined, {
    selectFromResult: ({data, isLoading}) => ({
      isLoading,
      serverModules: data,
      serverModulesBySlug: data?.map(s => s.slug),
    }),
  })
  const {modules: selectedModulesBySlug} = useSelector(selectModules)
  const [modules, setModules] = useState<Module[]>()

  useEffect(() => {
    if (serverModulesBySlug && selectedModulesBySlug === undefined) {
      dispatch(initializeModules(serverModulesBySlug))
    }
  }, [dispatch, serverModulesBySlug, selectedModulesBySlug])

  useEffect(() => {
    serverModules &&
      setModules(combineClientAndServerModules(clientModules, serverModules))
  }, [serverModules])

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
    serverModules,
    selectedModulesBySlug,
  }
}
