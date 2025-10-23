export enum AddressCity {
  Amsterdam = 'Amsterdam',
  Weesp = 'Weesp',
}

export type Coordinates = {
  lat: number
  lon: number
}

export type BaseAddress<Type = 'weg'> = {
  city: AddressCity
  coordinates?: Coordinates
  street: string
  type?: Type
}

export type Address = BaseAddress<'adres'> & {
  addition?: string
  additionLetter?: string
  additionNumber?: string
  addressLine1: string
  addressLine2: string
  bagId: string
  number: number
  postcode: string
}

export type AddressState = {
  /**
   * User provided address, settable via the user profile
   */
  address?: Address
  /**
   * Error when getting coordinates or fetching address fails
   */
  getLocationIsError: boolean | undefined
  /**
   * Purpose key for high accuracy location
   */
  highAccuracyPurposeKey: HighAccuracyPurposeKey
  /**
   * True when getting coordinates or fetching address
   */
  isGettingLocation?: boolean
  /**
   * GPS provided address
   */
  location?: Address
  /**
   * True when user requests to get the location
   */
  locationFetchRequested: boolean | undefined
  /**
   * user preference for using location or address
   */
  locationType?: LocationType
}

export type AddressList = Array<Address | BaseAddress>

export type LocationType = 'address' | 'location'

export enum HighAccuracyPurposeKey {
  PreciseLocationAddressConstructionWork = 'PreciseLocationAddressConstructionWork',
  PreciseLocationAddressLookup = 'PreciseLocationAddressLookup',
  PreciseLocationAddressWasteGuide = 'PreciseLocationAddressWasteGuide',
}
