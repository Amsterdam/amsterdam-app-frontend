export enum WasteGuideEndpointName {
  getWasteGuide = 'getWasteGuide',
  getWasteGuideNew = 'getWasteGuideNew',
}

export enum FractionCode {
  GA = 'GA',
  GFT = 'GFT',
  Glas = 'Glas',
  Papier = 'Papier',
  Plastic = 'Plastic',
  Rest = 'Rest',
  Textiel = 'Textiel',
}

export type Contract = {
  [bagNummeraanduidingId: string]: {hasContract: boolean}
}

export type WasteGuideQueryArg = {
  bagNummeraanduidingId: string
}

// TODO: cleanup after 18th of November 2024
export type WasteGuideResponseFraction = {
  afvalwijzerAfvalkalenderFrequentie: string | null
  afvalwijzerAfvalkalenderMelding: string | null
  afvalwijzerAfvalkalenderOpmerking: string | null
  afvalwijzerAfvalkalenderTot: string | null
  afvalwijzerAfvalkalenderVan: string | null
  afvalwijzerBasisroutetype: string | null
  afvalwijzerBasisroutetypeCode: string | null
  afvalwijzerBasisroutetypeId: string | null
  afvalwijzerBasisroutetypeOmschrijving: string | null
  afvalwijzerBuitenzetten: string | null
  afvalwijzerBuitenzettenTot: string | null
  afvalwijzerBuitenzettenVanaf: string | null
  afvalwijzerBuitenzettenVanafTot: string | null
  afvalwijzerButtontekst: string | null
  afvalwijzerFractieCode: FractionCode
  afvalwijzerFractieNaam: string
  afvalwijzerFractieVolgorde?: number | null // defined from 18th of November 2024
  afvalwijzerFractiecodeActief?: boolean // defined from 18th of November 2024
  afvalwijzerGeometrie: {
    coordinates: number[]
    type: string
  }
  afvalwijzerInstructie: string | null
  afvalwijzerInstructie2: string | null
  afvalwijzerInzamelgebiedCode: string | null
  afvalwijzerInzamelgebiedNaam: string | null
  afvalwijzerOphaaldagen: string[] | string | null // will be string[] from 18th of november 2024
  afvalwijzerOphaaldagen2: string[] | string | null // will be string[] from 18th of november 2024
  afvalwijzerPerXWeken: string | null
  afvalwijzerRoutenaam: string | null
  afvalwijzerRoutetypeNaam: string | null
  afvalwijzerUrl: string | null
  afvalwijzerWaar: string
  bagNummeraanduidingId: string
  gbdBuurtCode: string
  gbdBuurtId: string
  gebruiksdoelWoonfunctie: boolean
  huisletter: string | null
  huisnummer: 1
  huisnummertoevoeging: string | null
  id: string
  postcode: string
  statusAdres: string
  straatnaam: string
  woonplaatsnaam: string
}

export type WasteGuideResponse = {
  _embedded: {
    afvalwijzer: WasteGuideResponseFraction[]
  }
}

type WasteGuideCalendar = {
  alert: string
  code: string
  curb_rules_from: string
  curb_rules_to: string
  date: string
  label: string
}

export type WasteType = {
  alert: string
  button_text: string
  code: FractionCode
  curb_rules: string
  days_array: string[]
  frequency: string
  how: string
  label: string
  next_date: string
  note: string
  url: string
  where: string
}

export type WasteGuideNewResponse = {
  calendar: WasteGuideCalendar[]
  waste_types: WasteType[]
}
