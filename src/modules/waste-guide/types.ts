export enum WasteGuideEndpointName {
  getWasteGuide = 'getWasteGuide',
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

export type WasteGuideResponse = {
  calendar: WasteGuideCalendar[]
  is_collection_by_appointment: boolean
  is_residential: boolean
  waste_types: WasteType[]
}
