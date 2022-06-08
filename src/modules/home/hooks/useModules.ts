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
    isLoading: isLoadingServerModules,
  } = useGetModulesQuery(undefined, {
    selectFromResult: ({data, isLoading}) => ({
      isLoading,
      serverModules: data,
      serverModulesBySlug: data?.map(s => s.slug),
    }),
  })
  const {modules: userSelectedModulesBySlug} = useSelector(selectModules)
  const [modules, setModules] = useState<Module[]>()

  useEffect(() => {
    if (serverModulesBySlug && userSelectedModulesBySlug === undefined) {
      dispatch(initializeModules(serverModulesBySlug))
    }
  }, [dispatch, serverModulesBySlug, userSelectedModulesBySlug])

  useEffect(() => {
    serverModules &&
      setModules(combineClientAndServerModules(clientModules, serverModules))
  }, [serverModules])

  const getModulesWithoutInactive = useCallback(
    () => modules && modules.filter(m => m.status === 1),
    [modules],
  )

  const getModulesWithoutDeselected = useCallback(
    () =>
      modules &&
      modules.filter(m => userSelectedModulesBySlug?.includes(m.slug)),
    [modules, userSelectedModulesBySlug],
  )

  return {
    isLoadingServerModules,
    modules,
    getModulesWithoutInactive,
    getModulesWithoutDeselected,
    serverModules,
    userSelectedModulesBySlug,
  }
}
