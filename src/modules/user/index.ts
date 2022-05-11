import {Module} from '../types'
import {UserStack} from './Stack'

export const module: Module = {
  linking: {},
  name: 'UserModule',
  stack: UserStack,
  state: [],
  title: 'Mijn profiel',
}
