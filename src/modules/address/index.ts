import {addressSlice} from '@/modules/address//slice'
import {transformers} from '@/modules/address/transformers'
import {ModuleSlug} from '@/modules/slugs'
import {CoreModuleConfig} from '@/modules/types'

export const module: CoreModuleConfig = {
  name: 'AddressModule',
  slug: ModuleSlug.address,
  reduxConfigs: [
    {
      key: 'address',
      persist: true,
      transformers,
      slice: addressSlice,
    },
  ],
}

export * from './types'
