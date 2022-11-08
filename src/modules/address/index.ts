import {addressSlice} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
  name: 'AddressModule',
  slug: ModuleSlug.address,
  state: [addressSlice],
}

export * from './types'
