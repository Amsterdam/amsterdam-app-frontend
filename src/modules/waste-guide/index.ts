import {Module} from '../types'
import {WasteGuideStack} from './Stack'
import {wasteGuideRoutes} from './routes'

export const module: Module = {
  linking: {[wasteGuideRoutes.wasteGuide.name]: 'waste-guide'},
  name: 'WasteGuideModule',
  stack: WasteGuideStack,
  state: [],
}
