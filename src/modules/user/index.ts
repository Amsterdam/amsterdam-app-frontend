import {ModuleClientConfig} from '../types'
import {UserStack} from './Stack'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
  name: 'UserModule',
  slug: 'user',
  stack: UserStack,
  state: [],
}
