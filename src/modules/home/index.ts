import {ModuleSlugs} from '../slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
  name: 'HomeModule',
  slug: ModuleSlugs.home,
  state: [],
}
