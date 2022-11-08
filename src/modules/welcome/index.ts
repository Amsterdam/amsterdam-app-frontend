import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  hiddenInMenu: true,
  linking: {},
  name: 'WelcomeModule',
  slug: ModuleSlug.welcome,
  state: [],
}
