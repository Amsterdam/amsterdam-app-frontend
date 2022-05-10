import {Module} from '../types'
import {SettingsStack} from './Stack'

export const module: Module = {
  label: 'Instellingen',
  linking: {},
  name: 'SettingsModule',
  stack: SettingsStack,
  state: [],
}
