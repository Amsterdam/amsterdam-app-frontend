import {ComponentType} from 'react'
import {AddressStack} from './address/Stack'
import {CityOfficesStack} from './city-offices/Stack'
import {ConstructionWorkStack} from './construction-work/Stack'
import {ContactStack} from './contact/Stack'
import {HomeStack} from './home/Stack'
import {OpenWasteContainerStack} from './open-waste-container/Stack'
import {ReportProblemStack} from './report-problem/Stack'
import {ModuleSlugs} from './slugs'
import {UserStack} from './user/Stack'
import {WasteGuideStack} from './waste-guide/Stack'

const stacks: Record<ModuleSlugs, ComponentType<any>> = {
  [ModuleSlugs.address]: AddressStack,
  [ModuleSlugs['city-offices']]: CityOfficesStack,
  [ModuleSlugs['construction-work']]: ConstructionWorkStack,
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
