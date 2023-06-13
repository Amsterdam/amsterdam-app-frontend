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
  disabledModulesBySlug: string[],
  authorizedModulesBySlug: string[],
  serverModules?: ModuleServerConfig[],
) => {
  const modules = mergeModulesConfig(clientModules, serverModules)

  const authorizedModules = modules.filter(
    ({requiresAuthorization, slug}) =>
      !requiresAuthorization || authorizedModulesBySlug.includes(slug),
  )

  const selectedModules: Module[] = []
  const selectableModules: Module[] = []
  const selectedModulesBySlug: ModuleSlug[] = []

  authorizedModules.forEach(module => {
    const {isCore, slug} = module

    // only non-core modules may be toggled
    if (!isCore) {
      selectableModules.push(module)
    }
    // selected if the module is a core module or not disabled
    if (isCore || !disabledModulesBySlug?.includes(slug)) {
      selectedModules.push(module)
      selectedModulesBySlug.push(slug)
    }
  })

  return {
    /** All modules, disregarding authentication. Be careful when using this prop. You probably want to consider authorized or selected modules instead. */
    allModulesDangerous: modules,
    /** The modules, selected and not selected that a user may see. */
    authorizedModules,
    /** Modules that a user may toggle in the settings. */
    selectableModules,
    /** Modules that a user has enabled in the settings. */
    selectedModules,
    /** Modules that a user has enabled in the settings, by slug. */
    selectedModulesBySlug,
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
    clientModules,
    userDisabledModulesBySlug,
    modulesLoading,
    modulesError: error,
    refetchModules: retriesRemaining === 0 ? refetch : undefined,
    ...postProcessedModules,
  }
}
