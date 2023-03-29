export enum WasteGuideEndpointName {
  getGarbageCollectionArea = 'getGarbageCollectionArea',
}

export type WasteGuideQueryArg = {
  bagNummeraanduidingId: string
}

export type WasteGuideResponseFraction = {
  afvalwijzerAfvalkalenderMelding: string | null
  afvalwijzerAfvalkalenderOpmerking: string | null
  afvalwijzerAfvalkalenderTot: string | null
  afvalwijzerAfvalkalenderVan: string | null
  afvalwijzerBasisroutetype: string | null
  afvalwijzerBasisroutetypeCode: string | null
  afvalwijzerBasisroutetypeId: string | null
  afvalwijzerBasisroutetypeOmschrijving: string | null
  afvalwijzerBuitenzettenTot: string | null
  afvalwijzerBuitenzettenVanaf: string | null
  afvalwijzerBuitenzettenVanafTot: string | null
  afvalwijzerFractieCode: string
  afvalwijzerFractieNaam: string
  afvalwijzerGeometrie: {
    afvalwijzerBuitenzetten: string | null
    afvalwijzerButtontekst: string | null
    afvalwijzerInstructie2: string
    afvalwijzerInzamelgebiedCode: string | null
    afvalwijzerInzamelgebiedNaam: string | null
    afvalwijzerOphaaldagen2: string | null
    afvalwijzerUrl: string
    afvalwijzerWaar: string
    bagNummeraanduidingId: string
    coordinates: number[]
    gbdBuurtCode: string
    gbdBuurtId: string
    type: string
  }
  afvalwijzerInstructie: string | null
  afvalwijzerOphaaldagen: string | null
  afvalwijzerPerXWeken: string | null
  afvalwijzerRoutenaam: string | null
  afvalwijzerRoutetypeNaam: string | null
  gebruiksdoelWoonfunctie: false
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

export type WasteGuideResponseType = 'grofvuil' | 'huisvuil'

export enum WasteType {
  Bulky,
  Household,
}

export type WasteGuide = {
  [WasteType.Bulky]?: WasteGuideDetails
  [WasteType.Household]?: WasteGuideDetails
}

// Make all optional and add one by one?
export type WasteGuideDetails = {
  appointmentUrl: string | undefined
  collectionDays: string | undefined
  getsCollected: boolean
  howToOffer: string | undefined
  remark: string | undefined
  title: string
  whenToPutOut: string | undefined
}

export const mapWasteType = (type: WasteGuideResponseType): WasteType => {
  if (type === 'grofvuil') {
    return WasteType.Bulky
  }
  return WasteType.Household
}
