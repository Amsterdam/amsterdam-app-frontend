import {pollingStationSvgIcons} from '@/modules/elections/constants'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const electionsModule: ModuleClientConfig = {
  name: 'ElectionsModule',
  slug: ModuleSlug.elections,
  icons: pollingStationSvgIcons,
}
