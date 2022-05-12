import {ClientModule} from '../types'
import {UserStack} from './Stack'

export const module: ClientModule = {
  isCore: true,
  linking: {},
  name: 'UserModule',
  slug: 'user',
  stack: UserStack,
  state: [],
}
