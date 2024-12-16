import {CityPass, CityPassBudget} from '@/modules/city-pass/types'

export enum CityPassRouteName {
  budget = 'Budget',
  cityPassDetails = 'CityPassDetails',
  cityPassLogout = 'CityPassLogout',
  dashboard = 'Dashboard',
  login = 'Login',
  loginSteps = 'LoginSteps',
  securityCode = 'SecurityCode',
}

export type CityPassStackParams = {
  [CityPassRouteName.cityPassDetails]: {passNumber: CityPass['passNumber']}
  [CityPassRouteName.cityPassLogout]: undefined
  [CityPassRouteName.dashboard]: undefined
  [CityPassRouteName.budget]: {
    budgetCode: CityPassBudget['code']
    passNumber: CityPass['passNumber']
  }
  [CityPassRouteName.login]: undefined
  [CityPassRouteName.loginSteps]:
    | {
        accessToken?: string
        loginResult?: string
        refreshToken?: string
      }
    | undefined
  [CityPassRouteName.securityCode]: {id: CityPass['id']}
}

export enum CityPassModalName {}

export type CityPassModalParams = Record<string, never>
