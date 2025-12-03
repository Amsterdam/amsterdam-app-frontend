import {BurningGuideRouteName} from '@/modules/burning-guide/routes'
import {BurningGuideCodeVariant} from '@/modules/burning-guide/types'

export const mapVariantToScreenRoute = {
  [BurningGuideCodeVariant.red]: BurningGuideRouteName.burningGuideCodeRed,
  [BurningGuideCodeVariant.orange]:
    BurningGuideRouteName.burningGuideCodeOrange,
  [BurningGuideCodeVariant.yellow]:
    BurningGuideRouteName.burningGuideCodeYellow,
}
