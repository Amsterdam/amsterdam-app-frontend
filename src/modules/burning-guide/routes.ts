export enum BurningGuideRouteName {
  burningGuide = 'BurningGuide',
  burningGuideCodeOrange = 'BurningGuideCodeOrange',
  burningGuideCodeRed = 'BurningGuideCodeRed',
  burningGuideCodeYellow = 'BurningGuideCodeYellow',
  burningGuideNuisance = 'BurningGuideNuisance',
  burningGuideRisks = 'BurningGuideRisks',
  burningGuideTips = 'BurningGuideTips',
}

export type BurningGuideStackParams = {
  [BurningGuideRouteName.burningGuide]: undefined
  [BurningGuideRouteName.burningGuideCodeOrange]: undefined
  [BurningGuideRouteName.burningGuideCodeRed]: undefined
  [BurningGuideRouteName.burningGuideCodeYellow]: undefined
  [BurningGuideRouteName.burningGuideNuisance]: undefined
  [BurningGuideRouteName.burningGuideRisks]: undefined
  [BurningGuideRouteName.burningGuideTips]: undefined
}
export enum BurningGuideModalName {}

export type BurningGuideModalParams = Record<string, never>
