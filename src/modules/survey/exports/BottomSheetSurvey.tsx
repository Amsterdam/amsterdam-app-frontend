import {
  BottomSheet,
  type BottomSheetProps,
} from '@/components/features/bottom-sheet/BottomSheet'
import {Survey} from '@/modules/survey/exports/Survey'

export const BottomSheetSurvey = ({
  ...bottomSheetProps
}: Omit<BottomSheetProps, 'variants'>) => (
  <BottomSheet {...bottomSheetProps}>
    <Survey />
  </BottomSheet>
)
