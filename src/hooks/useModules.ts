import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useSentry} from '@/hooks'
import {useAppState} from '@/hooks/useAppState'
import {clientModules} from '@/modules'
import {ModuleServerConfig} from '@/modules/types'
import {useGetModulesForAppQuery} from '@/services'
import {selectDisabledModules} from '@/store'
import {mergeModulesConfig} from '@/utils'

const MAX_RETRIES = 3

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

  useEffect(() => {
    if (error) {
      sendSentryErrorLog('useGetModulesForAppQuery error', 'useModules.ts', {
        error,
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
