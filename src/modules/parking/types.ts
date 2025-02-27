export type ParkingAccount = {
  accessToken: string
  scope: ParkingPermitScope
}

export type ParkingFormLoginFormData = {
  pin: string
  reportCode: string
}

export enum ParkingEndpointName {
  login = 'login',
  permits = 'permits',
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

export type ParkingPermitsEndpointResponse = {
  discount: number
  forced_license_plate_list: boolean
  max_session_length_in_days: number
  max_sessions_allowed: number
  money_balance_applicable: boolean
  no_endtime: boolean
  parking_rate: {
    currency: string
    value: number
  }
  parking_rate_original: {
    currency: string
    value: number
  }
  payment_zones: [
    {
      city: string
      days: [
        {
          day_of_week: string
          end_time: string
          start_time: string
        },
      ]
      description: string
      id: string
    },
  ]
  permit_name: string
  permit_type: string
  permit_zone: {
    name: string
    permit_zone_id: string
    show_permit_zone_url: boolean
  }
  report_code: number
  time_balance: number
  time_balance_applicable: boolean
  time_valid_until: string
  visitor_account: {
    minutes_remaining: number
    pin: string
    report_code: number
  }
  visitor_account_allowed: boolean
}[]
