import {ClientModule} from '../../types'
import {HomeStack} from './Stack'

export const module: ClientModule = {
  linking: {},
  name: 'HomeModule',
  slug: 'home',
  stack: HomeStack,
  state: [],
}
