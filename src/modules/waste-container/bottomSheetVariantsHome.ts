import {WasteContainerSurveyBottomSheetContent} from '@/modules/waste-container/components/bottomsheet/WasteContainerSurveyBottomSheetContent'

export enum WasteContainerBottomSheetVariant {
  survey = 'survey',
}

export const bottomSheetVariantsHome = {
  [WasteContainerBottomSheetVariant.survey]:
    WasteContainerSurveyBottomSheetContent,
} satisfies Record<string, React.ComponentType>
