import {ComponentType} from 'react'
import {RootStackParams, StackNavigationRoutes} from '@/app/navigation/types'
import {AboutStack} from '@/modules/about/Stack'
import {AboutRouteName, AboutStackParams} from '@/modules/about/routes'
import {AccessCodeStack} from '@/modules/access-code/Stack'
import {
  AccessCodeRouteName,
  AccessCodeStackParams,
} from '@/modules/access-code/routes'
import {AddressStack} from '@/modules/address/Stack'
import {
  AddressModalParams,
  AddressRouteName,
  AddressStackParams,
} from '@/modules/address/routes'
import {addressModals} from '@/modules/address/screenConfig'
import {ChatStack} from '@/modules/chat/Stack'
import {CityPassStack} from '@/modules/city-pass/Stack'
import {
  CityPassModalParams,
  CityPassRouteName,
  CityPassStackParams,
} from '@/modules/city-pass/routes'
import {ConstructionWorkStack} from '@/modules/construction-work/Stack'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {constructionWorkModals} from '@/modules/construction-work/screenConfig'
import {ConstructionWorkEditorStack} from '@/modules/construction-work-editor/Stack'
import {
  ConstructionWorkEditorModalParams,
  ConstructionWorkEditorRouteName,
  ConstructionWorkEditorStackParams,
} from '@/modules/construction-work-editor/routes'
import {constructionWorkEditorModals} from '@/modules/construction-work-editor/screenConfig'
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
import {NotificationHistoryStack} from '@/modules/notification-history/Stack'
import {OnboardingStack} from '@/modules/onboarding/Stack'
import {
  OnboardingRouteName,
  OnboardingStackParams,
} from '@/modules/onboarding/routes'
import {ParkingStack} from '@/modules/parking/Stack'
import {ParkingRouteName, ParkingStackParams} from '@/modules/parking/routes'
import {RedirectsStack} from '@/modules/redirects/Stack'
import {
  RedirectsRouteName,
  RedirectsStackParams,
} from '@/modules/redirects/routes'
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
import {WasteContainerStack} from '@/modules/waste-container/Stack'
import {
  WasteContainerModalParams,
  WasteContainerRouteName,
  WasteContainerStackParams,
} from '@/modules/waste-container/routes'
import {wasteContainerModals} from '@/modules/waste-container/screenConfig'
import {WasteGuideStack} from '@/modules/waste-guide/Stack'
import {
  WasteGuideModalParams,
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {wasteGuideModals} from '@/modules/waste-guide/screenConfig'
import {devError} from '@/processes/development'

export type ModuleRoutes =
  | AboutRouteName
  | AccessCodeRouteName
  | AddressRouteName
  | CityPassRouteName
  | ConstructionWorkRouteName
  | ConstructionWorkEditorRouteName
  | ContactRouteName
  | HomeRouteName
  | OnboardingRouteName
  | ParkingRouteName
  | WasteContainerRouteName
  | RedirectsRouteName
  | ReportProblemRouteName
  | UserRouteName
  | WasteGuideRouteName

export type ModuleStackParams = AboutStackParams &
  AccessCodeStackParams &
  AddressStackParams &
  CityPassStackParams &
  ConstructionWorkStackParams &
  ConstructionWorkEditorStackParams &
  ContactStackParams &
  HomeStackParams &
  OnboardingStackParams &
  ParkingStackParams &
  WasteContainerStackParams &
  RedirectsStackParams &
  ReportProblemStackParams &
  UserStackParams &
  WasteGuideStackParams

const stacks: Record<ModuleSlug, ComponentType<unknown>> = {
  [ModuleSlug.about]: AboutStack,
  [ModuleSlug['access-code']]: AccessCodeStack,
  [ModuleSlug.address]: AddressStack,
  [ModuleSlug.chat]: ChatStack,
  [ModuleSlug['city-pass']]: CityPassStack,
  [ModuleSlug['construction-work']]: ConstructionWorkStack,
  [ModuleSlug['construction-work-editor']]: ConstructionWorkEditorStack,
  [ModuleSlug.contact]: ContactStack,
  [ModuleSlug.home]: HomeStack,
  [ModuleSlug['notification-history']]: NotificationHistoryStack,
  [ModuleSlug.onboarding]: OnboardingStack,
  [ModuleSlug.parking]: ParkingStack,
  [ModuleSlug['waste-container']]: WasteContainerStack,
  [ModuleSlug['report-problem']]: ReportProblemStack,
  [ModuleSlug.user]: UserStack,
  [ModuleSlug.redirects]: RedirectsStack,
  [ModuleSlug['waste-guide']]: WasteGuideStack,
}

export type ModalParams = AddressModalParams &
  CityPassModalParams &
  ConstructionWorkEditorModalParams &
  ContactModalParams &
  HomeModalParams &
  WasteContainerModalParams &
  ReportProblemModalParams &
  UserModalParams &
  WasteGuideModalParams

export const modals: StackNavigationRoutes<RootStackParams> = {
  ...addressModals,
  ...constructionWorkModals,
  ...constructionWorkEditorModals,
  ...contactModals,
  ...homeModals,
  ...wasteContainerModals,
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

  devError(
    `Stack not found for module with slug ${slug}. Add it to @/modules/stacks.ts.`,
  )

  return null
}
