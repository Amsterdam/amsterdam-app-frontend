export enum AddressCity {
  Amsterdam = 'Amsterdam',
  Weesp = 'Weesp',
}
export type ApiAddress = {
  _display: string
  adres: string
  adresseerbaar_object_id: string
  bagNummeraanduidingId: string
  bag_huisletter: string
  bag_toevoeging: string
  centroid?: [number, number]
  // TODO: Make coordinates required once standardization of address data is done
  coordinates?: {
    lat: number
    lon: number
  }
  dataset: string
  huisnummer: number
  landelijk_id: string
  postcode: string
  status: string
  straatnaam: string
  straatnaam_no_ws: string
  subtype: string
  subtype_id: string
  toevoeging: string
  type: string
  type_adres: string
  vbo_status: string
  woonplaats: AddressCity
}

export type Address = {
  addition?: string
  additionLetter?: string
  additionNumber?: string
  addressLine1: string
  addressLine2: string
  bagId: string
  city: AddressCity
  coordinates?: {
    lat: number
    lon: number
  }
  number: number
  postcode: string
  street: string
}

export type ResponseAddress = {
  results: ApiAddress[]
}

export type AddressQueryArg = {
  address?: string
  lat?: number
  lon?: number
}

export type BagResponse = {
  content: BagResponseContent
  label: string
  total_results: number
}

export type BagResponseContent = {
  _display: string
  uri: string
}[]
