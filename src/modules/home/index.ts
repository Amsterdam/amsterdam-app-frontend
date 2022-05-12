import {ClientModule} from '../types'
import {HomeStack} from './Stack'

export const module: ClientModule = {
  isCore: true,
  linking: {},
  name: 'HomeModule',
  slug: 'home',
  stack: HomeStack,
  state: [],
}
