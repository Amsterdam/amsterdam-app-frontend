import {migrations} from '@/modules/address/migrations'
import {addressSlice} from '@/modules/address/slice'
import {AddressState} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {CoreModuleConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof AddressState)[] = [
  'address',
  'locationType',
  'recentAddresses',
]

export const addressModule: CoreModuleConfig = {
  name: 'AddressModule',
  slug: ModuleSlug.address,
  reduxConfigs: [
    {
      key: ReduxKey.address,
      migrations,
      persistVersion: 0,
      slice: addressSlice,
      persistWhitelist,
    },
  ],
}
