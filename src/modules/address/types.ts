export enum AddressCity {
  Amsterdam = 'Amsterdam',
  Weesp = 'Weesp',
}

export type Address = {
  adres: string
  bag_huisletter: string
  bag_toevoeging: string
  centroid: [number, number]
  huisnummer: number
  landelijk_id: string
  postcode: string
  straatnaam: string
  woonplaats: AddressCity
}

export type ApiAddress = Address & {
  _display: string
  adresseerbaar_object_id: string
  dataset: string
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
