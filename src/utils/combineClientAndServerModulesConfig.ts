import {Module, ModuleClientConfig, ModuleServerConfig} from '../modules/types'
import {nonNullable} from './nonNullable'

export const combineClientAndServerModulesConfig = (
  clientConfig: ModuleClientConfig[],
  serverConfig?: ModuleServerConfig[],
): Module[] => {
  if (!serverConfig) {
    return [] as Module[]
  }

  return clientConfig
    .map(clientModule => {
      const serverModule = serverConfig.find(m => clientModule.slug === m.slug)

      if (serverModule) {
        return {...clientModule, ...serverModule}
      }
    })
    .filter(nonNullable)
}
