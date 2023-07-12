import {useMemo} from 'react'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {getFractions} from '@/modules/waste-guide/utils/fractions'

export const useFractions = (wasteGuide: WasteGuideResponseFraction[]) =>
  useMemo(() => getFractions(wasteGuide), [wasteGuide])
