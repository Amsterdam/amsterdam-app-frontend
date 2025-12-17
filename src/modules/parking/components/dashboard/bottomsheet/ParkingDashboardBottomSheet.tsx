import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {bottomsheetVariants} from '@/modules/parking/components/dashboard/bottomsheet/bottomsheetVariants'

export const ParkingDashboardBottomSheet = () => (
  <BottomSheet
    scroll
    testID="ParkingDashboardBottomSheet"
    variants={bottomsheetVariants}
  />
)
