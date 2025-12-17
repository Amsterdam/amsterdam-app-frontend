import type {FC} from 'react'
import {CityPassSurveyBottomSheetContent} from '@/modules/city-pass/bottomsheet/CityPassSurveyBottomSheetContent'

export enum CityPassBottomSheetVariant {
  survey = 'survey',
}

export const bottomsheetVariants: Record<CityPassBottomSheetVariant, FC> = {
  [CityPassBottomSheetVariant.survey]: CityPassSurveyBottomSheetContent,
}
