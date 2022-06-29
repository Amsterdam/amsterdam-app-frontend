import {ModuleSlugs} from '../slugs'
import {ModuleClientConfig} from '../types'
import {addressSlice} from './addressSlice'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
  name: 'AddressModule',
  slug: ModuleSlugs.address,
  state: [addressSlice],
}
