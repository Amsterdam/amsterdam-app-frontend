import {Module, ModuleClientConfig, ModuleServerConfig} from '../modules/types'
import {nonNullable} from './nonNullable'

export const combineClientAndServerModules = (
  clientModules: ModuleClientConfig[],
  serverModules?: ModuleServerConfig[],
): Module[] => {
  if (!serverModules) {
    return [] as Module[]
  }

  return clientModules
    .map(clientModule => {
      const serverModule = serverModules.find(m => clientModule.slug === m.slug)

      if (serverModule) {
        return {...clientModule, ...serverModule}
      }
    })
    .filter(nonNullable)
}
