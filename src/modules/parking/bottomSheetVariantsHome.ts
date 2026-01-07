import {ParkingDashboardBottomSheetVariant} from '@/modules/parking/components/dashboard/bottomsheet/bottomsheetVariants'
import {ParkingSurveyBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSurveyBottomSheetContent'

export const bottomSheetVariantsHome = {
  [ParkingDashboardBottomSheetVariant.survey]: ParkingSurveyBottomSheetContent,
} satisfies Record<string, React.ComponentType>
