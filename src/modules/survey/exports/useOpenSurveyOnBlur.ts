import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useOpenBottomsheetIfSurveyShouldShow} from '@/modules/survey/exports/useOpenBottomsheetIfSurveyShouldShow'

export const useOpenSurveyOnBlur = (entryPoint: string) => {
  const openSurveyBottomsheet = useOpenBottomsheetIfSurveyShouldShow(entryPoint)

  useBlurEffect(() => {
    setTimeout(() => openSurveyBottomsheet(), 500)
  })
}
