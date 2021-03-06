export type WasteGuideResponse = {
  features: WasteGuideResponseFeature[]
  type: string
}

type WasteGuideResponseFeature = {
  properties: WasteGuideResponseProperties
}

type WasteGuideResponseProperties = {
  aanbiedwijze: string
  dataset: string
  frequentie?: string | null
  mutatie: string
  ophaaldag: string | null
  ophalen: string
  opmerking: string | null
  stadsdeel_code: string
  stadsdeel_id: string
  stadsdeel_naam: string
  tijd_tot: string | null
  tijd_vanaf: string | null
  type: WasteGuideResponseType
  website?: string | null
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
