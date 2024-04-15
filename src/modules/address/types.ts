export enum AddressCity {
  Amsterdam = 'Amsterdam',
  Weesp = 'Weesp',
}

export type Coordinates = {
  lat: number
  lon: number
}

export type Address = {
  addition?: string
  additionLetter?: string
  additionNumber?: string
  addressLine1: string
  addressLine2: string
  bagId: string
  city: AddressCity
  coordinates?: Coordinates
  number: number
  postcode: string
  street: string
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
   * user preference for using location or address
   */
  locationType?: LocationType
  /**
   * True when user requests to get the location
   */
  startGettingLocation: boolean | undefined
}

export type PdokAddress = {
  centroide_ll: `POINT(${number} ${number})`
  huisletter?: string
  huisnummer: number
  huisnummertoevoeging?: string
  id: string
  nummeraanduiding_id: string
  postcode: string
  score: number
  straatnaam: string
  type: 'woonplaats' | 'weg' | 'adres'
  weergavenaam: string
  woonplaatsnaam: AddressCity
}

export type AddressResponse = {
  highlighting: unknown
  response: {
    docs: PdokAddress[]
  }
  spellcheck: {
    collations: []
    suggestions: []
  }
}

export type LocationType = 'address' | 'location'

export enum HighAccuracyPurposeKey {
  PreciseLocationAddressConstructionWork = 'PreciseLocationAddressConstructionWork',
  PreciseLocationAddressLookup = 'PreciseLocationAddressLookup',
  PreciseLocationAddressWasteGuide = 'PreciseLocationAddressWasteGuide',
}
