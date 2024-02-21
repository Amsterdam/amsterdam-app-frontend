import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {PiwikSessionDimension} from '@/processes/piwik/types'

export const redirectsModule: ModuleClientConfig = {
  logDimension: PiwikSessionDimension.redirectsModule,
  name: 'RedirectsModule',
  slug: ModuleSlug.redirects,
}
