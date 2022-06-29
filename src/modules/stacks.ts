import {ComponentType} from 'react'
import {AddressStack} from './address/Stack'
import {AddressRouteName, AddressStackParams} from './address/routes'
import {CityOfficesStack} from './city-offices/Stack'
import {
  CityOfficesRouteName,
  CityOfficesStackParams,
} from './city-offices/routes'
import {ConstructionWorkEditorStack} from './construction-work-editor/Stack'
import {
  ConstructionWorkEditorRouteName,
  ConstructionWorkEditorStackParams,
} from './construction-work-editor/routes'
import {ConstructionWorkStack} from './construction-work/Stack'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from './construction-work/routes'
import {ContactStack} from './contact/Stack'
import {ContactRouteName, ContactStackParams} from './contact/routes'
import {HomeStack} from './home/Stack'
import {HomeRouteName, HomeStackParams} from './home/routes'
import {OpenWasteContainerStack} from './open-waste-container/Stack'
import {
  OpenWasteContainerRouteName,
  OpenWasteContainerStackParams,
} from './open-waste-container/routes'
import {ReportProblemStack} from './report-problem/Stack'
import {
  ReportProblemRouteName,
  ReportProblemStackParams,
} from './report-problem/routes'
import {ModuleSlugs} from './slugs'
import {UserStack} from './user/Stack'
import {UserRouteName, UserStackParams} from './user/routes'
import {WasteGuideStack} from './waste-guide/Stack'
import {WasteGuideRouteName, WasteGuideStackParams} from './waste-guide/routes'

export type ModuleRoutes =
  | AddressRouteName
  | CityOfficesRouteName
  | ConstructionWorkRouteName
  | ConstructionWorkEditorRouteName
  | ContactRouteName
  | HomeRouteName
  | OpenWasteContainerRouteName
  | ReportProblemRouteName
  | UserRouteName
  | WasteGuideRouteName

export type ModuleStackParams = AddressStackParams &
  CityOfficesStackParams &
  ConstructionWorkStackParams &
  ConstructionWorkEditorStackParams &
  ContactStackParams &
  HomeStackParams &
  OpenWasteContainerStackParams &
  ReportProblemStackParams &
  UserStackParams &
  WasteGuideStackParams

const stacks: Record<ModuleSlugs, ComponentType<any>> = {
  [ModuleSlugs.address]: AddressStack,
  [ModuleSlugs['city-offices']]: CityOfficesStack,
  [ModuleSlugs['construction-work']]: ConstructionWorkStack,
  [ModuleSlugs['construction-work-editor']]: ConstructionWorkEditorStack,
  [ModuleSlugs.contact]: ContactStack,
  [ModuleSlugs.home]: HomeStack,
  [ModuleSlugs['open-waste-container']]: OpenWasteContainerStack,
  [ModuleSlugs['report-problem']]: ReportProblemStack,
  [ModuleSlugs.user]: UserStack,
  [ModuleSlugs['waste-guide']]: WasteGuideStack,
}

export const getModuleStack = (
  slug: ModuleSlugs,
): ComponentType<any> | null => {
  const stack = stacks[slug]
  if (stack) {
    return stack
  }
  console.error(
    `Stack not found for module with slug ${slug}, add it in @/modules/stacks.ts`,
  )
  return null
}
