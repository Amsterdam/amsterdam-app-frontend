import type {FC} from 'react'
import {ParkingSelectPermit} from '@/modules/parking/components/ParkingSelectPermit'
import {ParkingSurveyBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSurveyBottomSheetContent'

export enum ParkingDashboardBottomSheetVariant {
  selectPermit = 'selectPermit',
  survey = 'survey',
}

export const bottomsheetVariants: Record<
  ParkingDashboardBottomSheetVariant,
  FC
> = {
  [ParkingDashboardBottomSheetVariant.survey]: ParkingSurveyBottomSheetContent,
  [ParkingDashboardBottomSheetVariant.selectPermit]: ParkingSelectPermit,
}
