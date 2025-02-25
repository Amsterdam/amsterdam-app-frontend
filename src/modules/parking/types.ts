export type ParkingFormLoginFormData = {
  pin: string
  reportCode: string
}

export enum ParkingEndpointName {
  login = 'login',
}

export enum ParkingPermitScope {
  permitHolder = 'permitHolder',
  visitor = 'visitor',
}

export type ParkingLoginEndpointRequest = {
  pin: string
  report_code: string
}

export type ParkingLoginEndpointResponse = {
  access_token: string
  scope: ParkingPermitScope
}
