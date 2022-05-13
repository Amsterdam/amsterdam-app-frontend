import {ClientModule} from '../types'
import {ContactStack} from './Stack'

export const module: ClientModule = {
  linking: {},
  name: 'ContactModule',
  slug: 'contact',
  stack: ContactStack,
  state: [],
}
