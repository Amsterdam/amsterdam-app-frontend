import {bottomsheetVariants} from '@/modules/city-pass/bottomsheet/bottomsheetVariants'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {WasteContainerActionButton} from '@/modules/waste-container/components/WasteContainerActionButton'

export const wasteContainerModule: ModuleClientConfig = {
  ActionButton: WasteContainerActionButton,
  hiddenInMenu: true,
  name: 'WasteContainerModule',
  slug: ModuleSlug['waste-container'],
  bottomSheetVariantsHome: bottomsheetVariants,
}
