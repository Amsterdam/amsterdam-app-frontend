import {migrations} from '@/modules/address/migrations'
import {AddressState, addressSlice} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'
import {CoreModuleConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof AddressState)[] = ['address']

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
