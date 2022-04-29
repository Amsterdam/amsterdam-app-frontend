import {baseColor} from '../../tokens'

export type ColorTokens = typeof lightColorTokens

export const lightColorTokens = {
  background: {
    app: baseColor.neutral.grey2,
    darker: baseColor.primary.black,
    emphasis: baseColor.primary.darkblue,
    grey: baseColor.neutral.grey1,
    inactive: baseColor.neutral.grey4,
    invalid: baseColor.support.invalid,
    valid: baseColor.supplement.darkergreen,
    white: baseColor.primary.white,
  },
  screen: {
    background: baseColor.primary.white,
  },
  text: {
    default: baseColor.primary.black,
    inverted: baseColor.primary.white,
    secondary: baseColor.neutral.grey4,
    tertiary: baseColor.neutral.grey3,
  },
}
