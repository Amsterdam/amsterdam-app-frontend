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

export type ApiAddress = {
  type: string
  dataset: string
  adres: string
  postcode: string
  straatnaam: string
  straatnaam_no_ws: string
  huisnummer: number
  toevoeging: string
  bag_huisletter: string
  bag_toevoeging: string
  woonplaats: string
  type_adres: string
  status: string
  landelijk_id: string
  vbo_status: string
  adresseerbaar_object_id: string
  subtype: string
  centroid: [number, number]
  subtype_id: string
  _display: string
}

export type ResponseAddress = {
  results: [ApiAddress]
}
