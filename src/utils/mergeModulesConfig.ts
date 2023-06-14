import {Module, ModuleClientConfig, ModuleServerConfig} from '@/modules/types'

type MergedModules = {
  coreModules: ModuleClientConfig[]
  modules: Module[]
}

export const mergeModulesConfig = (
  clientConfig: ModuleClientConfig[],
  serverConfig?: ModuleServerConfig[],
): MergedModules => {
  if (!serverConfig) {
    return {coreModules: [], modules: []}
  }

  const modules: Module[] = []
  const coreModules: ModuleClientConfig[] = []

  serverConfig.forEach(serverModule => {
    const clientModule = clientConfig.find(
      ({slug}) => slug === serverModule.moduleSlug,
    )

    if (!clientModule) {
      return
    }

    modules.push({...clientModule, ...serverModule})
  })

  clientConfig.forEach(clientModule => {
    if (!clientModule.isCore) {
      return
    }

    coreModules.push(clientModule)
  })

  return {coreModules, modules}
}
