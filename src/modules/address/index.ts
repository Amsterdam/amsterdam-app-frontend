import {ModuleSlug} from '../slugs'
import {ModuleClientConfig} from '../types'
import {addressSlice} from './addressSlice'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
  name: 'AddressModule',
  slug: ModuleSlug.address,
  state: [addressSlice],
}

export * from './types'
