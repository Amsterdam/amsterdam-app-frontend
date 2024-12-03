import {accessCodeSlice, AccessCodeState} from '@/modules/access-code/slice'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof AccessCodeState)[] = ['attemptsLeft']

export const accessCodeModule: ModuleClientConfig = {
  hiddenInMenu: true,
  name: 'AccessCodeModule',
  reduxConfigs: [
    {
      key: ReduxKey.accessCode,
      persistVersion: 0,
      persistWhitelist,
      slice: accessCodeSlice,
    },
  ],
  slug: ModuleSlug['access-code'],
  alwaysEnabled: true,
}
