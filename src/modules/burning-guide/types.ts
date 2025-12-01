export enum BurningGuideEndpointName {
  burningGuide = 'burningGuide',
}

export enum BurningGuideCodeVariant {
  orange = 'Oranje',
  red = 'Rood',
  yellow = 'Geel',
}

// temp
export type ListItem = {
  id: string
  isFixed: boolean
  timeWindow: string
  variant: BurningGuideCodeVariant
}
