export enum CityPassEndpointName {
  getCityPasses = 'getCityPasses',
}

export type CityPass = {
  actief: boolean
  balance_update_time: Date
  budgetten: Budget[]
  budgetten_actief: boolean
  categorie: string
  categorie_code: string
  eigenaar: string
  expiry_date: Date
  id: number
  originele_pas: OriginalPass
  pasnummer: number
  pasnummer_volledig: string
  passoort: PassType
}

export type Budget = {
  budget_assigned: number
  budget_balance: number
  code: string
  expiry_date: Date
  naam: string
  omschrijving: string
}

export type OriginalPass = {
  categorie: string
  categorie_code: string
  id: number
  pasnummer: number
  pasnummer_volledig: string
  passoort: PassType
}

export type PassType = {
  id: number
  naam: string
}

export type PassOwner = {
  achternaam: string
  initialen: string
  passen: {
    actief: boolean
    pasnummer: number
  }[]
  voornaam: string
}

export type Transaction = {
  aanbieder: {
    id: number
    naam: string
  }
  bedrag: number
  id: number
  omschrijving?: string
  transactiedatum: string
}
