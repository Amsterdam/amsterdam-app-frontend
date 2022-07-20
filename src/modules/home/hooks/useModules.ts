import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useSentry} from '@/hooks'
import {useAppState} from '@/hooks/useAppState'
import {clientModules} from '@/modules'
import {useGetModulesForAppQuery} from '@/modules/home/services'
import {selectDisabledModules} from '@/modules/home/store'
import {ModuleServerConfig} from '@/modules/types'
import {mergeModulesConfig} from '@/utils'

const MAX_RETRIES = 3

const tempGetModulesForAppApiStatesSelector = (state: {
  api?: {queries?: Record<string, unknown>}
}) => {
  if (state.api?.queries) {
    return Object.entries(state.api.queries).reduce<unknown[]>(
      (result, [key, value]) => {
        return key.indexOf('getModulesForApp') === 0
          ? [...result, value]
          : result
      },
      [],
    )
  }
  return []
}

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
  const {
    data: serverModules,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetModulesForAppQuery()
  const {sendSentryErrorLog} = useSentry()
  const {disabledModules: disabledModulesBySlug} = useSelector(
    selectDisabledModules,
  )
  const [retriesRemaining, setRetriesRemaining] = useState(MAX_RETRIES)
  const [postProcessedModules, setPostProcessedModules] = useState(
    postProcessModules(disabledModulesBySlug, serverModules),
  )

  useEffect(() => {
    setPostProcessedModules(
      postProcessModules(disabledModulesBySlug, serverModules),
    )
  }, [disabledModulesBySlug, serverModules])

  const getModulesForAppApiStates = useSelector(
    tempGetModulesForAppApiStatesSelector,
  )

  useEffect(() => {
    if (error) {
      sendSentryErrorLog('useGetModulesForAppQuery error', 'useModules.ts', {
        error,
        getModulesForAppApiStates,
        retriesRemaining,
        serverModules,
      })
      if (retriesRemaining > 0) {
        refetch()
        setRetriesRemaining(v => v - 1)
      }
    } else {
      setRetriesRemaining(MAX_RETRIES)
    }
  }, [
    error,
    getModulesForAppApiStates,
    isLoading,
    refetch,
    retriesRemaining,
    sendSentryErrorLog,
    serverModules,
  ])

  useAppState({
    onForeground: () => {
      setRetriesRemaining(MAX_RETRIES)
      refetch()
    },
  })

  // this prevents the situation where an empty modules array is returned when isLoading is false
  // we should fix this later by handling the async nature of requests in a better way
  const modulesLoading =
    isLoading || (isSuccess && postProcessedModules.modules.length === 0)

  return {
    modulesLoading,
    modulesError: error,
    refetchModules: retriesRemaining === 0 ? refetch : undefined,
    ...postProcessedModules,
  }
}
