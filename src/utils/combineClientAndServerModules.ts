import {ClientModule, Module, ServerModule} from '../modules/types'
import {nonNullable} from './nonNullable'

export const combineClientAndServerModules = (
  clientModules: ClientModule[],
  serverModules: ServerModule[],
): Module[] => {
  return clientModules
    .map(clientModule => {
      const serverModule = serverModules.find(m => clientModule.slug === m.slug)
      if (serverModule) {
        return {...clientModule, ...serverModule}
      }
    })
    .filter(nonNullable)
}
