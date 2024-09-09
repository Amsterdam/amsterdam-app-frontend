import {CityPass, CityPassBudget} from '@/modules/city-pass/types'

export enum CityPassRouteName {
  budget = 'Budget',
  cityPassDetails = 'CityPassDetails',
  cityPassLogout = 'CityPassLogout',
  dashboard = 'Dashboard',
  securityCode = 'SecurityCode',
}

export type CityPassStackParams = {
  [CityPassRouteName.cityPassDetails]: {passNumber: CityPass['passNumber']}
  [CityPassRouteName.cityPassLogout]: undefined
  [CityPassRouteName.dashboard]: {
    accessToken?: string
    loginResult?: string
    refreshToken?: string
  }
  [CityPassRouteName.budget]: {
    budgetCode: CityPassBudget['code']
    passNumber: CityPass['passNumber']
  }
  [CityPassRouteName.securityCode]: {id: CityPass['id']}
}

export enum CityPassModalName {}

export type CityPassModalParams = Record<string, never>
