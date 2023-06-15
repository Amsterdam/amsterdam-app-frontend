import {ModuleSlug} from '@/modules/slugs'
import {Module, ModuleClientConfig, ModuleServerConfig} from '@/modules/types'

export const mergeModulesConfig = (
  clientConfig: ModuleClientConfig[],
  serverConfig: ModuleServerConfig[],
) => {
  const modules: Module[] = []

  serverConfig.forEach(serverModule => {
    const clientModule = clientConfig.find(
      ({slug}) => slug === serverModule.moduleSlug,
    )

    if (!clientModule) {
      return
    }

    modules.push({...clientModule, ...serverModule})
  })

  return modules
}

export const postProcessModules = (
  clientModuleConfigs: ModuleClientConfig[],
  userDisabledModulesBySlug: string[],
  authorizedModulesBySlug: string[],
  serverModuleConfigs: ModuleServerConfig[],
) => {
  const modules = mergeModulesConfig(clientModuleConfigs, serverModuleConfigs)

  const authorizedModules = modules.filter(
    ({requiresAuthorization, slug}) =>
      !requiresAuthorization || authorizedModulesBySlug.includes(slug),
  )

  const enabledModules: Module[] = []
  const toggleableModules: Module[] = []
  const enabledModulesBySlug: ModuleSlug[] = []

  authorizedModules.forEach(module => {
    const {alwaysEnabled, slug} = module

    // only modules that are not "alwaysEnabled" may be toggled by the user
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
    /** All modules, disregarding authentication. Be careful when using this prop. You probably want to consider authorized or selected modules instead. */
    allModulesDangerous: modules,
    /** The modules, selected and not selected that a user may see. They may be not active (remotely disabled). */
    authorizedModules,
    /** Modules that a user has enabled in the settings or that are always enabled. They may be not active (remotely disabled). */
    enabledModules,
    /** Modules that a user has enabled in the settings or that are always enabled, by slug.  They may be not active (remotely disabled). */
    enabledModulesBySlug,
    /** Modules that a user may enable/disable in the settings. They may be not active (remotely disabled). */
    toggleableModules,
  }
}
