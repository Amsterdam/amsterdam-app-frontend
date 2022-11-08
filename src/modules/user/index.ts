import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
  name: 'UserModule',
  slug: ModuleSlug.user,
  state: [],
}
