import {accessCodeSlice, AccessCodeState} from '@/modules/access-code/slice'
import {ModuleSlug} from '@/modules/slugs'
import {type CoreModuleConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof AccessCodeState)[] = [
  'attemptsLeft',
  'useBiometrics',
]

export const accessCodeModule: CoreModuleConfig = {
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
}
