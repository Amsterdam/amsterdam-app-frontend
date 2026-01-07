import {ActionButton as actionButtons0} from '@/modules/city-pass/ActionButton.tsx'
import {ActionButton as actionButtons1} from '@/modules/parking/ActionButton.tsx'
import {ModuleSlug} from '@/modules/slugs'
import {ActionButton as actionButtons2} from '@/modules/waste-container/ActionButton.tsx'

export const actionButtons = {
  [ModuleSlug['city-pass']]: actionButtons0,
  [ModuleSlug.parking]: actionButtons1,
  [ModuleSlug['waste-container']]: actionButtons2,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
