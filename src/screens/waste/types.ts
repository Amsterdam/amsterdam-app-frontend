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
  frequentie: string
  mutatie: string
  ophaaldag: string
  ophalen: string
  opmerking: string
  stadsdeel_code: string
  stadsdeel_id: string
  stadsdeel_naam: string
  tijd_tot: string
  tijd_vanaf: string
  type: WasteGuideResponseType
  website: string
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

export type WasteGuideDetails = {
  appointmentUrl: string | undefined
  collectionDays: string
  howToOffer: string
  remark: string
  whenToPutOut: string
}

export const mapWasteType = (type: WasteGuideResponseType): WasteType => {
  if (type === 'grofvuil') {
    return WasteType.Bulky
  }
  return WasteType.Household
}
