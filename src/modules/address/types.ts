export enum AddressCity {
  Amsterdam = 'Amsterdam',
  Weesp = 'Weesp',
}

export type Address = {
  adres: string
  bagNummeraanduidingId: string
  bag_huisletter: string
  bag_toevoeging: string
  coordinates: {
    lat: number
    lon: number
  }
  huisnummer: number
  postcode: string
  straatnaam: string
  woonplaats: AddressCity
}

export type ApiAddress = Address & {
  _display: string
  adresseerbaar_object_id: string
  centroid: [number, number]
  dataset: string
  landelijk_id: string
  status: string
  straatnaam_no_ws: string
  subtype: string
  subtype_id: string
  toevoeging: string
  type: string
  type_adres: string
  vbo_status: string
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
