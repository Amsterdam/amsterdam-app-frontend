import {ClientModule} from '../types'
import {OpenWasteContainerStack} from './Stack'

export const module: ClientModule = {
  linking: {},
  name: 'OpenWasteContainerModule',
  slug: 'open-waste-container',
  stack: OpenWasteContainerStack,
  state: [],
}
