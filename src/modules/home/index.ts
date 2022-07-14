import {ModuleSlug} from '../slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
  name: 'HomeModule',
  slug: ModuleSlug.home,
  state: [],
}
