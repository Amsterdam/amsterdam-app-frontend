import {Module, ModuleClientConfig, ModuleServerConfig} from '@/modules/types'

export const mergeModulesConfig = (
  clientConfig: ModuleClientConfig[],
  serverConfig?: ModuleServerConfig[],
): Module[] => {
  if (!serverConfig) {
    return []
  }

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
