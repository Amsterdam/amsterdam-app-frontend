import {ClientModule} from '../types'
import {ConstructionWorkStack} from './Stack'

export const module: ClientModule = {
  linking: {},
  name: 'ConstructionWorkModule',
  slug: 'construction-work',
  stack: ConstructionWorkStack,
  state: [],
}
