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

export type AddressSuggestion = {
  centroide_ll: `POINT(${number} ${number})`
  huisletter?: string
  huisnummer: number
  huisnummertoevoeging?: string
  nummeraanduiding_id: string
  postcode: string
  score: number
  straatnaam: string
  type: 'woonplaats' | 'weg' | 'adres'
  weergavenaam: string
  woonplaatsnaam: AddressCity
}
export type AddressSuggestResponse = {
  highlighting: unknown
  response: {
    docs: AddressSuggestion[]
  }
  spellcheck: {
    collations: []
    suggestions: []
  }
}
