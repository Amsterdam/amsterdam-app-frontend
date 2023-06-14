import {persistedStateTransformers} from '@/modules/address/persistedStateTransformers'
import {ModuleSlug} from '@/modules/slugs'
import {CoreModuleConfig} from '@/modules/types'

export const module: CoreModuleConfig = {
  name: 'AddressModule',
  slug: ModuleSlug.address,
  persistedStateTransformers,
}

export * from './types'
