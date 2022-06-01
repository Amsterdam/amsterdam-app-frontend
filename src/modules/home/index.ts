import {ModuleClientConfig} from '../types'
import {HomeStack} from './Stack'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
  name: 'HomeModule',
  slug: 'home',
  stack: HomeStack,
  state: [],
}
