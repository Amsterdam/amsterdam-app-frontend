import {Paginated} from '@/types/api'

// Routes
export enum ParkingEndpointName {
  accountDetails = 'accountDetails',
  addLicensePlate = 'addLicensePlate',
  licensePlates = 'licensePlates',
  login = 'login',
  parkingSessions = 'parkingSessions',
  permits = 'permits',
  removeLicensePlate = 'removeLicensePlate',
}

// Account
export type ParkingAccountDetails = {
  account_type: string
  address: {
    city: string
    concatenated_address: string
    house_letter: string
    house_number: string
    street: string
    suffix: string
    zip_code: string
  }
  client_id: number
  email: string
  initials: string
  last_name: string
  phone_number: string
  wallet: {
    balance: number
    currency: string
  }
}

export enum ParkingPermitScope {
  permitHolder = 'permitHolder',
  visitor = 'visitor',
}

type ParkingAccountAuth = {
  accessToken: string
  scope: ParkingPermitScope
}

export type ParkingAccountLogin = {
  pin: string
  reportCode: string
}

export type RequestPinCode = {
  phoneLastFourDigits: string
  reportCode: string
}

export type SecureParkingAccount = ParkingAccountAuth & ParkingAccountLogin

export type ParkingLoginEndpointRequest = {
  pin: string
  report_code: string
}

export type ParkingLoginEndpointResponse = {
  access_token: string
  scope: ParkingPermitScope
}

// License-plate
export type ParkingLicensePlate = {
  vehicle_id: string
  visitor_name?: string
}

export type LicensePlatesEndpointRequest = {
  accessToken: string
  reportCode: string
}

export type LicensePlatesEndpointResponse = ParkingLicensePlate[]

export type AddLicensePlateEndpointRequest = {
  accessToken: string
  report_code: string
  vehicle_id: string
  visitor_name: string
}

export type AddLicensePlateEndpointResponse = {
  report_code: string
  vehicle_id: string
  visitor_name: string
}

export type RemoveLicensePlateEndpointRequest = {
  accessToken: string
  report_code: string
  vehicle_id: string
}

export type RemoveLicensePlateEndpointResponse = {
  report_code: string
  vehicle_id: string
}

// Permit
export type PaymentZone = {
  city: string
  days: {
    day_of_week: string
    end_time: string
    start_time: string
  }[]
  description: string
  id: string
}

export enum PermitType {
  'GA-parkeervergunning voor bewoners (passagiers)' = 'GA-parkeervergunning voor bewoners (passagiers)',
  bezoekersvergunning = 'Bezoekersvergunning',
  codevergunning = 'Codevergunning',
  kraskaartvergunning = 'Kraskaartvergunning',
  mantelzorgvergunning = 'Mantelzorgvergunning',
}

export type ParkingPermit = {
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
  payment_zones: PaymentZone[]
  permit_name: string
  permit_type: PermitType
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
}

export type ParkingPermitsEndpointResponse = ParkingPermit[]

// Parking-session

export enum ParkingSessionStatus {
  active = 'Actief',
  cancelled = 'Geannuleerd',
  completed = 'Voltooid',
  planned = 'Gepland',
}

export type ParkingSession = {
  created_time: string
  end_date: string
  is_cancelled: boolean
  is_paid: boolean
  money_balance_applicable: boolean
  no_endtime: boolean
  parking_cost: {
    currency: string
    value: 0
  }
  ps_right_id: 0
  remaining_time: 0
  report_code: string
  start_date: string
  status: ParkingSessionStatus
  time_balance_applicable: boolean
  vehicle_id: string
  visitor_name?: string
}

export type ParkingSessionsEndpointRequest = {
  accessToken: string
  report_code: string
}

export type ParkingSessionsEndpointResponse = Paginated<ParkingSession>
