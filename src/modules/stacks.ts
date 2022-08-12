import {ComponentType} from 'react'
import {RootStackParams, StackNavigationRoutes} from '@/app/navigation'
import {AddressStack} from '@/modules/address/Stack'
import {
  AddressModalParams,
  AddressRouteName,
  AddressStackParams,
} from '@/modules/address/routes'
import {addressModals} from '@/modules/address/screenConfig'
import {ConstructionWorkEditorStack} from '@/modules/construction-work-editor/Stack'
import {
  ConstructionWorkEditorModalParams,
  ConstructionWorkEditorRouteName,
  ConstructionWorkEditorStackParams,
} from '@/modules/construction-work-editor/routes'
import {constructionWorkEditorModals} from '@/modules/construction-work-editor/screenConfig'
import {ConstructionWorkStack} from '@/modules/construction-work/Stack'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {constructionWorkModals} from '@/modules/construction-work/screenConfig'
import {ContactStack} from '@/modules/contact/Stack'
import {
  ContactModalParams,
  ContactRouteName,
  ContactStackParams,
} from '@/modules/contact/routes'
import {contactModals} from '@/modules/contact/screenConfig'
import {HomeStack} from '@/modules/home/Stack'
import {
  HomeModalParams,
  HomeRouteName,
  HomeStackParams,
} from '@/modules/home/routes'
import {homeModals} from '@/modules/home/screenConfig'
import {OpenWasteContainerStack} from '@/modules/open-waste-container/Stack'
import {
  OpenWasteContainerModalParams,
  OpenWasteContainerRouteName,
  OpenWasteContainerStackParams,
} from '@/modules/open-waste-container/routes'
import {openWasteContainerModals} from '@/modules/open-waste-container/screenConfig'
import {ReportProblemStack} from '@/modules/report-problem/Stack'
import {
  ReportProblemModalParams,
  ReportProblemRouteName,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'
import {reportProblemModals} from '@/modules/report-problem/screenConfig'
import {ModuleSlug} from '@/modules/slugs'
import {UserStack} from '@/modules/user/Stack'
import {
  UserModalParams,
  UserRouteName,
  UserStackParams,
} from '@/modules/user/routes'
import {userModals} from '@/modules/user/screenConfig'
import {WasteGuideStack} from '@/modules/waste-guide/Stack'
import {
  WasteGuideModalParams,
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {wasteGuideModals} from '@/modules/waste-guide/screenConfig'

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

export type ModalParams = AddressModalParams &
  ConstructionWorkEditorModalParams &
  ContactModalParams &
  HomeModalParams &
  OpenWasteContainerModalParams &
  ReportProblemModalParams &
  UserModalParams &
  WasteGuideModalParams

export const modals: StackNavigationRoutes<RootStackParams> = {
  ...addressModals,
  ...constructionWorkModals,
  ...constructionWorkEditorModals,
  ...contactModals,
  ...homeModals,
  ...openWasteContainerModals,
  ...reportProblemModals,
  ...userModals,
  ...wasteGuideModals,
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
