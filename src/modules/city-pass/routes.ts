export enum CityPassRouteName {
  balance = 'Balance',
  cityPassDetails = 'CityPassDetails',
  dashboard = 'Dashboard',
  securityCode = 'SecurityCode',
}

export type CityPassStackParams = {
  [CityPassRouteName.cityPassDetails]: {passNumber: number}
  [CityPassRouteName.dashboard]: undefined
  [CityPassRouteName.balance]: undefined
  [CityPassRouteName.securityCode]: undefined
}

export enum CityPassModalName {}

export type CityPassModalParams = Record<string, never>
