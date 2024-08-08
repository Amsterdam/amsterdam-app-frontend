import {BudgetOld, PassOwnerOld} from '@/modules/city-pass/types'

export enum CityPassRouteName {
  budget = 'Budget',
  cityPassDetails = 'CityPassDetails',
  cityPassLogout = 'CityPassLogout',
  dashboard = 'Dashboard',
  securityCode = 'SecurityCode',
}

export type CityPassStackParams = {
  [CityPassRouteName.cityPassDetails]: {passOwner: PassOwnerOld}
  [CityPassRouteName.cityPassLogout]: undefined
  [CityPassRouteName.dashboard]: {loginResult?: string}
  [CityPassRouteName.budget]: {budget: BudgetOld}
  [CityPassRouteName.securityCode]: undefined
}

export enum CityPassModalName {}

export type CityPassModalParams = Record<string, never>
