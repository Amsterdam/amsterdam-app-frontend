import {CityPassSurveyBottomSheetContent} from '@/modules/city-pass/bottomsheet/CityPassSurveyBottomSheetContent'
import {CityPassBottomSheetVariant} from '@/modules/city-pass/bottomsheet/bottomsheetVariants'

export const bottomSheetVariantsHome = {
  [CityPassBottomSheetVariant.survey]: CityPassSurveyBottomSheetContent,
} satisfies Record<string, React.ComponentType>
