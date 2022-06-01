import {ModuleClientConfig} from '../types'
import {OpenWasteContainerStack} from './Stack'

export const module: ModuleClientConfig = {
  linking: {},
  name: 'OpenWasteContainerModule',
  slug: 'open-waste-container',
  stack: OpenWasteContainerStack,
  state: [],
}
