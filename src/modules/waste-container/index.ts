import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {WasteContainerActionButton} from '@/modules/waste-container/components/WasteContainerActionButton'
import {wasteContainerSlice} from '@/modules/waste-container/slice'
import {ReduxKey} from '@/store/types/reduxKey'

export const wasteContainerModule: ModuleClientConfig = {
  ActionButton: WasteContainerActionButton,
  hiddenInMenu: true,
  name: 'WasteContainerModule',
  reduxConfigs: [
    {
      key: ReduxKey.wasteContainer,
      slice: wasteContainerSlice,
    },
  ],
  slug: ModuleSlug['waste-container'],
}
