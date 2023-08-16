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

export type AddressQueryArg = {
  address?: string
  lat?: number
  lon?: number
}

export type AddressForCoordinates = {
  huisletter?: string
  huisnummer: number
  huisnummertoevoeging?: string
  id: string
  straatnaam: string
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
