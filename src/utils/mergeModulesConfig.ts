import {Module, ModuleClientConfig, ModuleServerConfig} from '@/modules/types'

export const mergeModulesConfig = (
  clientConfig: ModuleClientConfig[],
  serverConfig?: ModuleServerConfig[],
): Module[] => {
  if (!serverConfig) {
    return [] as Module[]
  }

  const modules: Module[] = []

  serverConfig.forEach(serverModule => {
    const clientModule = clientConfig.find(
      ({slug}) => serverModule.moduleSlug === slug,
    )

    if (!clientModule) {
      return
    }

    modules.push({...clientModule, ...serverModule})
  })

  return modules
}
