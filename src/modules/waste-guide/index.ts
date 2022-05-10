import {Module} from '../types'
import {WasteGuideStack} from './Stack'

export const module: Module = {
  label: 'Afval',
  linking: {},
  name: 'WasteGuideModule',
  stack: WasteGuideStack,
  state: [],
}
