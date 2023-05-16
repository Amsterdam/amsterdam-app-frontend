export enum WasteGuideEndpointName {
  getGarbageCollectionArea = 'getGarbageCollectionArea',
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
  afvalwijzerGeometrie: {
    coordinates: number[]
    type: string
  }
  afvalwijzerInstructie: string | null
  afvalwijzerInstructie2: string
  afvalwijzerInzamelgebiedCode: string | null
  afvalwijzerInzamelgebiedNaam: string | null
  afvalwijzerOphaaldagen: string | null
  afvalwijzerOphaaldagen2: string | null
  afvalwijzerPerXWeken: string | null
  afvalwijzerRoutenaam: string | null
  afvalwijzerRoutetypeNaam: string | null
  afvalwijzerUrl: string
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

export enum WasteGuideUrl {
  collectionPointsUrl = 'https://kaart.amsterdam.nl/afvalpunten',
  wasteContainersUrl = 'https://kaart.amsterdam.nl/afvalcontainers',
}
