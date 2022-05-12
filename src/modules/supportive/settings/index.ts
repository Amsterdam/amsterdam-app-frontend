import {ClientModule} from '../../types'
import {SettingsStack} from './Stack'

export const module: ClientModule = {
  isCore: true,
  linking: {},
  name: 'SettingsModule',
  slug: 'settings',
  stack: SettingsStack,
  state: [],
}
