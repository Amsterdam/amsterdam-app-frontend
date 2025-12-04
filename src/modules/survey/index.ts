import {ModuleSlug} from '@/modules/slugs'
import {surveySlice} from '@/modules/survey/slice'
import {ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const surveyModule: ModuleClientConfig = {
  alwaysEnabled: true,
  hiddenInMenu: true,
  name: 'SurveyModule',
  reduxConfigs: [
    {
      key: ReduxKey.survey,
      persistVersion: 0,
      slice: surveySlice,
    },
  ],
  slug: ModuleSlug.survey,
}
