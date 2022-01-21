export type Address = {
  adres: string
  bag_huisletter: string
  bag_toevoeging: string
  centroid: [number, number]
  huisnummer: number
  postcode: string
  straatnaam: string
  woonplaats: string
}

export type ApiAddress = Address & {
  _display: string
  adresseerbaar_object_id: string
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
  results: [ApiAddress]
}
