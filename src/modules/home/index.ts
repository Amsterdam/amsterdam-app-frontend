import {Module} from '../types'
import {HomeStack} from './Stack'

export const module: Module = {
  linking: {},
  label: 'Home',
  name: 'HomeModule',
  stack: HomeStack,
  state: [],
}
