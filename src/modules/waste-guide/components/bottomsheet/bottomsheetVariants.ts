import type {FC} from 'react'
import {WasteContainerSurveyBottomSheetContent} from '@/modules/waste-container/components/bottomsheet/WasteContainerSurveyBottomSheetContent'
import {WasteContainerBottomSheetVariant} from '@/modules/waste-container/components/bottomsheet/bottomsheetVariants'
import {WasteGuideSelectLocationTypeBottomSheetContent} from '@/modules/waste-guide/components/bottomsheet/WasteGuideSelectLocationTypeBottomSheetContent'

export enum WasteGuideBottomSheetVariant {
  addressSelector = 'addressSelector',
}

export const bottomsheetVariants: Record<string, FC> = {
  [WasteGuideBottomSheetVariant.addressSelector]:
    WasteGuideSelectLocationTypeBottomSheetContent,
  [WasteContainerBottomSheetVariant.survey]:
    WasteContainerSurveyBottomSheetContent,
}
