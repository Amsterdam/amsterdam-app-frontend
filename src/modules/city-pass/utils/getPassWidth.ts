import {DEFAULT_PASS_WIDTH} from '@/modules/city-pass/constants'

export const getPassWidth = (windowWidth: number) =>
  Math.min(windowWidth * 0.8, DEFAULT_PASS_WIDTH)
