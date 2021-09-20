export type Address = {
  adres: string
  bag_huisletter: string
  bag_toevoeging: string
  centroid: number[]
  huisnummer: number
  postcode: string
  straatnaam: string
  woonplaats: string
}

export type ResponseAddress = {
  results: [Address]
}
