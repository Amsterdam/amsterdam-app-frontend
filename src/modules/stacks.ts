import {ComponentType} from 'react'
import {AddressStack} from './address/Stack'
import {CityOfficesStack} from './city-offices/Stack'
import {ConstructionWorkStack} from './construction-work/Stack'
import {ContactStack} from './contact/Stack'
import {HomeStack} from './home/Stack'
import {OpenWasteContainerStack} from './open-waste-container/Stack'
import {ReportProblemStack} from './report-problem/Stack'
import {UserStack} from './user/Stack'
import {WasteGuideStack} from './waste-guide/Stack'
import {clientModules} from './'

const stacks: Record<
  typeof clientModules[number]['slug'],
  ComponentType<any>
> = {
  address: AddressStack,
  'city-offices': CityOfficesStack,
  'construction-work': ConstructionWorkStack,
  contact: ContactStack,
  home: HomeStack,
  'open-waste-container': OpenWasteContainerStack,
  'report-problem': ReportProblemStack,
  user: UserStack,
  'waste-guide': WasteGuideStack,
}

export const getModuleStack = (
  slug: typeof clientModules[number]['slug'],
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
