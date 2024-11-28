import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'

export const accessCodeModule: ModuleClientConfig = {
  hiddenInMenu: true,
  name: 'AccessCodeModule',
  slug: ModuleSlug['access-code'],
  alwaysEnabled: true,
}
