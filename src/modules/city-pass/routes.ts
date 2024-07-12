export enum CityPassRouteName {
  cityPassDetails = 'CityPassDetails',
  dashboard = 'Dashboard',
}

export type CityPassStackParams = {
  [CityPassRouteName.cityPassDetails]: {passNumber: number}
  [CityPassRouteName.dashboard]: undefined
}

export enum CityPassModalName {}

export type CityPassModalParams = Record<string, never>
