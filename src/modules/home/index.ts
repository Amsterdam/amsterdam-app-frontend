import {Module} from '../types'
import {HomeStack} from './Stack'

export const module: Module = {
  linking: {},
  name: 'HomeModule',
  stack: HomeStack,
  state: [],
  title: 'Home',
}
