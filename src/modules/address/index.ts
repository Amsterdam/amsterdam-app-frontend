import {addressSlice} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'
import {BaseModuleConfig} from '@/modules/types'

export const module: BaseModuleConfig = {
  name: 'AddressModule',
  slug: ModuleSlug.address,
  state: [addressSlice],
}

export * from './types'
