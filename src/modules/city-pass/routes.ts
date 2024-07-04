export enum CityPassRouteName {
  cityPassDetails = 'CityPassDetails',
  cityPassView = 'CityPassView',
  dashboard = 'Dashboard',
}

export type CityPassStackParams = {
  [CityPassRouteName.cityPassView]: {passNumber?: number} | undefined
  [CityPassRouteName.cityPassDetails]: {passNumber: number}
  [CityPassRouteName.dashboard]: undefined
}

export enum CityPassModalName {}

export type CityPassModalParams = Record<string, never>
