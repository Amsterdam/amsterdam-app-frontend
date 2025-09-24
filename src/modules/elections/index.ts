import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const electionsModule: ModuleClientConfig = {
  alwaysEnabled: true,
  name: 'ElectionsModule',
  slug: ModuleSlug.elections,
}
