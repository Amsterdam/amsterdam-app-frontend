import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {PiwikSessionDimension} from '@/processes/piwik/types'

export const reportProblemModule: ModuleClientConfig = {
  logDimension: PiwikSessionDimension.reportProblemModule,
  name: 'ReportProblemModule',
  slug: ModuleSlug['report-problem'],
}
