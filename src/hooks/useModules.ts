import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
// eslint-disable-next-line no-restricted-imports
import {version as releaseVersion} from '@/../package.json'
import {useAppState, useSentry} from '@/hooks'
import {clientModules} from '@/modules'
import {ModuleSlug} from '@/modules/slugs'
import {Module, ModuleServerConfig} from '@/modules/types'
import {useGetReleaseQuery} from '@/services'
import {selectAuthorizedModules, selectDisabledModules} from '@/store'
import {mergeModulesConfig} from '@/utils'

const MAX_RETRIES = 3

const postProcessModules = (
  userDisabledModulesBySlug: string[],
  authorizedModulesBySlug: string[],
  serverModules?: ModuleServerConfig[],
) => {
  const modules = mergeModulesConfig(clientModules, serverModules)

  const authorizedModules = modules.filter(
    ({requiresAuthorization, slug}) =>
      !requiresAuthorization || authorizedModulesBySlug.includes(slug),
  )

  const enabledModules: Module[] = []
  const toggleableModules: Module[] = []
  const enabledModulesBySlug: ModuleSlug[] = []

  authorizedModules.forEach(module => {
    const {alwaysEnabled, slug} = module

    // only non-core modules that are not "alwaysEnabled" may be toggled by the user
    if (!alwaysEnabled) {
      toggleableModules.push(module)
    }
    // a module is enabled if it has the property `alwaysEnabled` or if it is enabled by the user
    if (alwaysEnabled || !userDisabledModulesBySlug?.includes(slug)) {
      enabledModules.push(module)
      enabledModulesBySlug.push(slug)
    }
  })

  return {
    /** All non-core modules, disregarding authentication. Be careful when using this prop. You probably want to consider authorized or selected modules instead. */
    allModulesDangerous: modules,
    /** The non-core modules, selected and not selected that a user may see. They may be not active (remotely disabled). */
    authorizedModules,
    /** Non-core modules that a user has enabled in the settings or that are always enabled. They may be not active (remotely disabled). */
    enabledModules,
    /** Non-core modules that a user has enabled in the settings or that are always enabled, by slug.  They may be not active (remotely disabled). */
    enabledModulesBySlug,
    /** Non-core modules that a user may enable/disable in the settings. They may be not active (remotely disabled). */
    toggleableModules,
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
  const authorizedModulesBySlug = useSelector(selectAuthorizedModules)
  const [retriesRemaining, setRetriesRemaining] = useState(MAX_RETRIES)
  const postProcessedModules = useMemo(
    () =>
      postProcessModules(
        userDisabledModulesBySlug,
        authorizedModulesBySlug,
        serverModules,
      ),
    [authorizedModulesBySlug, userDisabledModulesBySlug, serverModules],
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
    isLoading ||
    (isSuccess && postProcessedModules.allModulesDangerous.length === 0)

  return {
    userDisabledModulesBySlug,
    modulesLoading,
    modulesError: error,
    refetchModules: retriesRemaining === 0 ? refetch : undefined,
    ...postProcessedModules,
  }
}
