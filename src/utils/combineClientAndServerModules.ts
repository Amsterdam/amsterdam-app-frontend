import {Module, PersonalisedClientModule, ServerModule} from '../modules/types'
import {nonNullable} from './nonNullable'

export const combineClientAndServerModules = (
  clientModules: PersonalisedClientModule[],
  serverModules?: ServerModule[],
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
