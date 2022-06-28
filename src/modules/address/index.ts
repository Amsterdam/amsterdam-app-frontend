import {ModuleClientConfig} from '../types'
import {addressSlice} from './addressSlice'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
  name: 'AddressModule',
  slug: 'address',
  state: [addressSlice],
}
