import type {FC} from 'react'
import {WasteContainerSurveyBottomSheetContent} from '@/modules/waste-container/components/bottomsheet/WasteContainerSurveyBottomSheetContent'

export enum WasteContainerBottomSheetVariant {
  survey = 'survey',
}

export const bottomsheetVariants: Record<WasteContainerBottomSheetVariant, FC> =
  {
    [WasteContainerBottomSheetVariant.survey]:
      WasteContainerSurveyBottomSheetContent,
  }
