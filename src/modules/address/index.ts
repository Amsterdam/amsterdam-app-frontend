import {addressSlice} from '@/modules/address//slice'
import {migrations} from '@/modules/address/migrations'
import {ModuleSlug} from '@/modules/slugs'
import {CoreModuleConfig} from '@/modules/types'

export const module: CoreModuleConfig = {
  name: 'AddressModule',
  slug: ModuleSlug.address,
  reduxConfigs: [
    {
      key: 'address',
      migrations,
      persistVersion: 0,
      slice: addressSlice,
    },
  ],
}

export * from './types'
