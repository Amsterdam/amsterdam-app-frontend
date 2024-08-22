import {CityPass, CityPassBudget} from '@/modules/city-pass/types'

export enum CityPassRouteName {
  budget = 'Budget',
  cityPassDetails = 'CityPassDetails',
  cityPassLogout = 'CityPassLogout',
  dashboard = 'Dashboard',
  securityCode = 'SecurityCode',
}

export type CityPassStackParams = {
  [CityPassRouteName.cityPassDetails]: {cityPass: CityPass}
  [CityPassRouteName.cityPassLogout]: undefined
  [CityPassRouteName.dashboard]: {loginResult?: string}
  [CityPassRouteName.budget]: {
    budget: CityPassBudget
    firstname: CityPass['owner']['firstname']
    passNumber: CityPass['passNumber']
  }
  [CityPassRouteName.securityCode]: {id: CityPass['id']}
}

export enum CityPassModalName {}

export type CityPassModalParams = Record<string, never>
