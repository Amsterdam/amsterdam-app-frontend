import type {FC} from 'react'
import {ParkingSelectPermit} from '@/modules/parking/components/ParkingSelectPermit'
import {Survey} from '@/modules/survey/exports/Survey'

export enum ParkingDashboardBottomSheetVariant {
  selectPermit = 'selectPermit',
  survey = 'survey',
}

export const bottomsheetVariants: Record<
  ParkingDashboardBottomSheetVariant,
  FC
> = {
  [ParkingDashboardBottomSheetVariant.survey]: Survey,
  [ParkingDashboardBottomSheetVariant.selectPermit]: ParkingSelectPermit,
}
