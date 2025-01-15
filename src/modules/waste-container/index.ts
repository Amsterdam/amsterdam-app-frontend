import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const wasteContainerModule: ModuleClientConfig = {
  hiddenInMenu: true,
  name: 'OpenWasteContainerModule',
  slug: ModuleSlug['waste-container'],
}
