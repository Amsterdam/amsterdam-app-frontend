import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const burningGuideModule: ModuleClientConfig = {
  name: 'BurningGuideModule',
  slug: ModuleSlug['burning-guide'],
  requiresFirebaseToken: true,
}
