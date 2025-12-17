import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useOpenBottomsheetIfSurveyShouldShow} from '@/modules/survey/exports/useOpenBottomsheetIfSurveyShouldShow'

export const useOpenSurveyOnBlur = (
  entryPoint: string,
  bottomsheetVariant: string,
) => {
  const openSurveyBottomsheet = useOpenBottomsheetIfSurveyShouldShow(entryPoint)

  useBlurEffect(() => {
    setTimeout(() => openSurveyBottomsheet(bottomsheetVariant), 500)
  })
}
