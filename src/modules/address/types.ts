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

/** @deprecated API refactor: this should be removed from address since it is a general API thing */
export type AddressQueryArg = {
  address?: string
  lat?: number
  lon?: number
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
