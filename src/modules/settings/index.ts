import {Module} from '../types'
import {SettingsStack} from './Stack'

export const module: Module = {
  linking: {},
  name: 'SettingsModule',
  stack: SettingsStack,
  state: [],
}
