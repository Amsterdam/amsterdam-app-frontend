import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const surveyModule: ModuleClientConfig = {
  alwaysEnabled: true,
  hiddenInMenu: true,
  name: 'SurveyModule',
  slug: ModuleSlug.survey,
}
