import {Budget, PassOwner} from '@/modules/city-pass/types'

export enum CityPassRouteName {
  budget = 'Budget',
  cityPassDetails = 'CityPassDetails',
  dashboard = 'Dashboard',
  securityCode = 'SecurityCode',
}

export type CityPassStackParams = {
  [CityPassRouteName.cityPassDetails]: {passOwner: PassOwner}
  [CityPassRouteName.dashboard]: undefined
  [CityPassRouteName.budget]: {budget: Budget}
  [CityPassRouteName.securityCode]: undefined
}

export enum CityPassModalName {}

export type CityPassModalParams = Record<string, never>
