import {ClientModule} from '../types'
import {WasteGuideStack} from './Stack'

export const module: ClientModule = {
  linking: {},
  name: 'WasteGuideModule',
  slug: 'waste-guide',
  stack: WasteGuideStack,
  state: [],
}
