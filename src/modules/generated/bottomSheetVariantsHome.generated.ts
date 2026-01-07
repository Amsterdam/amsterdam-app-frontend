import {bottomSheetVariantsHome as bottomSheetVariantsHome0} from '@/modules/city-pass/bottomSheetVariantsHome'
import {bottomSheetVariantsHome as bottomSheetVariantsHome1} from '@/modules/parking/bottomSheetVariantsHome'
import {ModuleSlug} from '@/modules/slugs'
import {bottomSheetVariantsHome as bottomSheetVariantsHome2} from '@/modules/waste-container/bottomSheetVariantsHome'

export const bottomSheetVariantsHome = {
  [ModuleSlug['city-pass']]: bottomSheetVariantsHome0,
  [ModuleSlug.parking]: bottomSheetVariantsHome1,
  [ModuleSlug['waste-container']]: bottomSheetVariantsHome2,
} satisfies Partial<Record<ModuleSlug, Record<string, React.ComponentType>>>
