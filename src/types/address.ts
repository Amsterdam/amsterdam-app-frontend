export type Address = {
  adres: string
  centroid: number[]
  huisnummer: number
  postcode: string
  straatnaam: string
  woonplaats: string
}

export type ResponseAddress = {
  results: [Address]
}
