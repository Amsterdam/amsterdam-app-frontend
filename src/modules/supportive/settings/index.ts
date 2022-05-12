import {ClientModule} from '../../types'
import {SettingsStack} from './Stack'

export const module: ClientModule = {
  linking: {},
  name: 'SettingsModule',
  slug: 'settings',
  stack: SettingsStack,
  state: [],
}
