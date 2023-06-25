import {addressSlice} from '@/modules/address//slice'
import {persistedStateTransformers} from '@/modules/address/persistedStateTransformers'
import {ModuleSlug} from '@/modules/slugs'
import {CoreModuleConfig} from '@/modules/types'

export const module: CoreModuleConfig = {
  name: 'AddressModule',
  slug: ModuleSlug.address,
  reduxConfig: [
    {
      key: 'address',
      persist: true,
      persistedStateTransformers,
      slice: addressSlice,
    },
  ],
}

export * from './types'
