import {useCallback} from 'react'
import {useIsModuleActive} from '@/hooks/useIsModuleActive'
import {ModuleSlug} from '@/modules/slugs'
import {useConfigConditionsPassed} from '@/modules/survey/hooks/useConfigConditionsPassed'
import {useBottomSheetSurveyEntryPoint} from '@/modules/survey/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const useOpenBottomsheetIfSurveyShouldShow = (entryPoint: string) => {
  const {open} = useBottomSheet()
  const {isConditionsPassed: showSurvey} = useConfigConditionsPassed(entryPoint)
  const isSurveyModuleActive = useIsModuleActive(ModuleSlug.survey)
  const {addEntryPoint} = useBottomSheetSurveyEntryPoint()

  return useCallback(
    (variant?: string) => {
      if (isSurveyModuleActive && showSurvey) {
        addEntryPoint(entryPoint)
        open(variant)
      }
    },
    [addEntryPoint, entryPoint, isSurveyModuleActive, open, showSurvey],
  )
}
