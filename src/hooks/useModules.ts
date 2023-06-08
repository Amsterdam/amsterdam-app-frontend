import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
// eslint-disable-next-line no-restricted-imports
import {version as releaseVersion} from '@/../package.json'
import {useAppState, useSentry} from '@/hooks'
import {clientModules} from '@/modules'
import {ModuleServerConfig} from '@/modules/types'
import {useGetReleaseQuery} from '@/services'
import {selectAuthorizedModules, selectDisabledModules} from '@/store'
import {mergeModulesConfig} from '@/utils'

const MAX_RETRIES = 3

const postProcessModules = (
  disabledModulesBySlug: string[],
  authorizedModulesBySlug: string[],
  serverModules?: ModuleServerConfig[],
) => {
  const modules = mergeModulesConfig(clientModules, serverModules)

  const authorizedModules = modules.filter(
    module =>
      !module.requiresAuthorization ||
      authorizedModulesBySlug.includes(module.slug),
  )

  const selectedModules = modules.filter(
    module => !disabledModulesBySlug?.includes(module.slug),
  )

  return {
    authorizedModules,
    modules,
    selectedModules,
    selectedModulesBySlug: selectedModules.map(module => module.slug),
  }
}

export const useModules = () => {
  const {
    data: release,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetReleaseQuery(releaseVersion ?? skipToken)
  const serverModules = release?.modules
  const {sendSentryErrorLog} = useSentry()
  const userDisabledModulesBySlug = useSelector(selectDisabledModules)
  const authorizedModules = useSelector(selectAuthorizedModules)
  const [retriesRemaining, setRetriesRemaining] = useState(MAX_RETRIES)
  const postProcessedModules = useMemo(
    () =>
      postProcessModules(
        userDisabledModulesBySlug,
        authorizedModules,
        serverModules,
      ),
    [authorizedModules, userDisabledModulesBySlug, serverModules],
  )

  useEffect(() => {
    if (error) {
      sendSentryErrorLog('useGetModulesForAppQuery error', 'useModules.ts', {
        error,
        retriesRemaining,
        serverModules,
      })
      if (retriesRemaining > 0) {
        void refetch()
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
      void refetch()
    },
  })

  // This prevents the situation where an empty modules array is returned when isLoading is false.
  // TODO We should fix this later by handling the async nature of requests in a better way.
  const modulesLoading =
    isLoading || (isSuccess && postProcessedModules.modules.length === 0)

  return {
    clientModules,
    userDisabledModulesBySlug,
    modulesLoading,
    modulesError: error,
    refetchModules: retriesRemaining === 0 ? refetch : undefined,
    ...postProcessedModules,
  }
}
