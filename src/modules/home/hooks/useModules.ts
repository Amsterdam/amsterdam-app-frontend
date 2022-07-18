import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useSentry} from '@/hooks'
import {useAppState} from '@/hooks/useAppState'
import {useGetModulesForAppQuery} from '@/modules/home/services'
import {selectDisabledModules} from '@/modules/home/store'
import {clientModules} from '@/modules/index'
import {ModuleServerConfig} from '@/modules/types'
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
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetModulesForAppQuery()
  const {sendSentryErrorLog} = useSentry()
  const {disabledModules: disabledModulesBySlug} = useSelector(
    selectDisabledModules,
  )
  const [retriesRemaining, setRetriesRemaining] = useState(MAX_RETRIES - 1)
  const [postProcessedModules, setPostProcessedModules] = useState(
    postProcessModules(disabledModulesBySlug, serverModules),
  )

  useEffect(() => {
    setPostProcessedModules(
      postProcessModules(disabledModulesBySlug, serverModules),
    )
  }, [disabledModulesBySlug, serverModules])

  useEffect(() => {
    console.log(retriesRemaining)
    if (error) {
      if (!isLoading) {
        sendSentryErrorLog('useGetModulesForAppQuery error', 'useModules.ts', {
          error,
          retriesRemaining,
          serverModules,
        })
        if (retriesRemaining > 0) {
          refetch()
          setRetriesRemaining(v => v - 1)
        }
      }
    } else {
      setRetriesRemaining(MAX_RETRIES - 1)
    }
  }, [
    error,
    isLoading,
    refetch,
    retriesRemaining,
    sendSentryErrorLog,
    serverModules,
  ])

  useEffect(() => {
    const noModulesFromBackEnd =
      isSuccess && (!serverModules || serverModules.length === 0)
    if (noModulesFromBackEnd || postProcessedModules.modules.length === 0) {
      sendSentryErrorLog('No modules', 'useModules.ts', {
        postProcessedModules,
        serverModules,
      })
    }
  }, [isSuccess, postProcessedModules, sendSentryErrorLog, serverModules])

  useAppState({
    onForeground: () => {
      refetch()
      setRetriesRemaining(MAX_RETRIES - 1)
    },
  })

  // this prevents the situation where an empty modules array is returned when isLoading is false
  // we should fix this later by handling the async nature of requests in a better way
  const modulesLoading =
    isLoading || (isSuccess && postProcessedModules.modules.length === 0)

  return {
    modulesLoading,
    refetchModules: retriesRemaining === 0 ? refetch : undefined,
    modulesError: error,
    ...postProcessedModules,
  }
}
