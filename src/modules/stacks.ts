import {ComponentType} from 'react'
import {AddressStack} from '@/modules/address/Stack'
import {
  AddressModalParams,
  AddressRouteName,
  AddressStackParams,
} from '@/modules/address/routes'
import {addressModals} from '@/modules/address/screenConfig'
import {ConstructionWorkEditorStack} from '@/modules/construction-work-editor/Stack'
import {
  ConstructionWorkEditorRouteName,
  ConstructionWorkEditorStackParams,
} from '@/modules/construction-work-editor/routes'
import {ConstructionWorkStack} from '@/modules/construction-work/Stack'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {ContactStack} from '@/modules/contact/Stack'
import {ContactRouteName, ContactStackParams} from '@/modules/contact/routes'
import {HomeStack} from '@/modules/home/Stack'
import {HomeRouteName, HomeStackParams} from '@/modules/home/routes'
import {OpenWasteContainerStack} from '@/modules/open-waste-container/Stack'
import {
  OpenWasteContainerRouteName,
  OpenWasteContainerStackParams,
} from '@/modules/open-waste-container/routes'
import {ReportProblemStack} from '@/modules/report-problem/Stack'
import {
  ReportProblemRouteName,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserStack} from '@/modules/user/Stack'
import {UserRouteName, UserStackParams} from '@/modules/user/routes'
import {WasteGuideStack} from '@/modules/waste-guide/Stack'
import {
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'

export type ModuleRoutes =
  | AddressRouteName
  | ConstructionWorkRouteName
  | ConstructionWorkEditorRouteName
  | ContactRouteName
  | HomeRouteName
  | OpenWasteContainerRouteName
  | ReportProblemRouteName
  | UserRouteName
  | WasteGuideRouteName

export type ModuleStackParams = AddressStackParams &
  ConstructionWorkStackParams &
  ConstructionWorkEditorStackParams &
  ContactStackParams &
  HomeStackParams &
  OpenWasteContainerStackParams &
  ReportProblemStackParams &
  UserStackParams &
  WasteGuideStackParams

const stacks: Record<ModuleSlug, ComponentType<unknown>> = {
  [ModuleSlug.address]: AddressStack,
  [ModuleSlug['construction-work']]: ConstructionWorkStack,
  [ModuleSlug['construction-work-editor']]: ConstructionWorkEditorStack,
  [ModuleSlug.contact]: ContactStack,
  [ModuleSlug.home]: HomeStack,
  [ModuleSlug['open-waste-container']]: OpenWasteContainerStack,
  [ModuleSlug['report-problem']]: ReportProblemStack,
  [ModuleSlug.user]: UserStack,
  [ModuleSlug['waste-guide']]: WasteGuideStack,
}

export type ModalParams = AddressModalParams

export const modals = {
  ...addressModals,
}

export const getModuleStack = (
  slug: ModuleSlug,
): ComponentType<unknown> | null => {
  const stack = stacks[slug]
  if (stack) {
    return stack
  }
  console.error(
    `Stack not found for module with slug ${slug}. Add it to @/modules/stacks.ts.`,
  )
  return null
}
