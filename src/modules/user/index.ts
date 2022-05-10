import {Module} from '../types'
import {UserStack} from './Stack'

export const module: Module = {
  label: 'Mijn profiel',
  linking: {},
  name: 'UserModule',
  stack: UserStack,
  state: [],
}
