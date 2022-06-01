import {ModuleClientConfig} from '../types'
import {ContactStack} from './Stack'

export const module: ModuleClientConfig = {
  linking: {},
  name: 'ContactModule',
  slug: 'contact',
  stack: ContactStack,
  state: [],
}
