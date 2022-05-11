import mock from '../components/features/modules/mock.json'
import {nonNullable} from '../utils'
import {ClientModule, ServerModule} from './types'
import {module as wasteGuideModule} from './waste-guide'

const frontEndModules = [wasteGuideModule]

const combineClientAndServerModules = (
  feModules: ClientModule[],
  beModules: ServerModule[],
): (ClientModule & ServerModule)[] => {
  return feModules
    .map(feModule => {
      const beModule = beModules.find(m => feModule.slug === m.slug)
      if (beModule) {
        return {...feModule, ...beModule}
      }
    })
    .filter(nonNullable)
}

export const modules = combineClientAndServerModules(
  frontEndModules,
  mock.modules,
)
