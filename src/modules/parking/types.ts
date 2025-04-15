import {Paginated, PaginationQueryArgs} from '@/types/api'

// Routes
export enum ParkingEndpointName {
  accountDetails = 'accountDetails',
  addLicensePlate = 'addLicensePlate',
  deleteSession = 'deleteSession',
  editSession = 'editSession',
  licensePlates = 'licensePlates',
  login = 'login',
  parkingSessions = 'parkingSessions',
  permits = 'permits',
  removeLicensePlate = 'removeLicensePlate',
  sessionReceipt = 'sessionReceipt',
  startSession = 'startSession',
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
  days: PaymentZoneDay[]
  description: string
  id: string
}

export type PaymentZoneDay = {
  day_of_week: string
  end_time: string
  start_time: string
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

export type ParkingPermitsEndpointRequestParams = {
  accessToken: string
  status?: 'ACTIVE'
}

// Parking-session

export enum ParkingSessionStatus {
  active = 'ACTIVE',
  cancelled = 'CANCELLED',
  completed = 'COMPLETED',
  planned = 'PLANNED',
}

export type ParkingSession = {
  created_time: string
  end_date_time: string
  is_cancelled: boolean
  is_paid: boolean
  money_balance_applicable: boolean
  no_endtime: boolean
  parking_cost: {
    currency: string
    value: number
  }
  payment_zone_id?: string
  ps_right_id: number
  remaining_time: number
  report_code: string
  start_date_time: string
  status: ParkingSessionStatus
  time_balance_applicable: boolean
  vehicle_id: string
  visitor_name?: string
}

export type ParkingSessionsEndpointRequest = {
  accessToken: string
  report_code: string
  status?: ParkingSessionStatus
} & PaginationQueryArgs

export type ParkingSessionsEndpointResponse = Paginated<ParkingSession>

export type ParkingSessionReceiptEndpointResponse = {
  costs: {
    currency: string
    value: number
  }
  costs_per_hour: {
    currency: string
    value: number
  }
  current_time_balance: number
  current_wallet_balance: {
    currency: string
    value: number
  }
  end_time: string
  parking_cost: {
    currency: string
    value: number
  }
  parking_time: number
  payment_required: boolean
  payment_zone_id: string
  regime_time: [
    {
      end_time: string
      id: string
      start_time: string
    },
  ]
  remaining_parking_time: number
  remaining_time: number
  remaining_time_balance: number
  remaining_wallet_balance: {
    currency: string
    value: number
  }
  report_code: number
  start_time: string
}

export type ParkingSessionReceiptEndpointRequestParams = {
  accessToken: string
  end_date_time: string
  payment_zone_id: string
  report_code: string
  start_date_time: string
  vehicle_id: string
}
export type ParkingStartSessionEndpointRequestParams = {
  accessToken: string
  balance?: {
    amount: number
    currency: string
  }
  locale?: string
  parking_session: {
    end_date_time?: string
    payment_zone_id: string
    report_code: string
    start_date_time: string
    vehicle_id: string
  }
  redirect?: {
    merchant_return_url: string
  }
}

export type ParkingEditSessionEndpointRequestParams = {
  accessToken: string
  balance?: {
    amount: number
    currency: string
  }
  locale?: string
  parking_session: {
    end_date_time: string
    ps_right_id: number
    report_code: string
    start_date_time: string
  }
  redirect?: {
    merchant_return_url: string
  }
}

export type ParkingAddSessionResponse = {
  frontend_id: number
  /**
   * The order status can be one of the following:
   * Initiated
   * Processing
   * ...?
   */
  order_status: string
  /**
   * The order type can be one of the following:
   * Parking
   * Payment
   * Both
   * ...?
   */
  order_type: string
  redirect_url?: string
}

export type ParkingDeleteSessionEndpointRequestParams = {
  accessToken: string
  end_date_time: string
  ps_right_id: number
  report_code: string
  start_date_time: string
}
