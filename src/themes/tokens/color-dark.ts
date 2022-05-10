import {baseColor} from '../../tokens'
import {ColorTokens} from './color-light'

// TODO Implement dark mode properly
export const darkColorTokens: ColorTokens = {
  background: {
    app: baseColor.neutral.grey5,
    darker: baseColor.primary.black,
    emphasis: baseColor.primary.darkblue,
    grey: baseColor.neutral.grey4,
    inactive: baseColor.neutral.grey1,
    invalid: baseColor.support.invalid,
    tooltip: baseColor.neutral.grey1,
    valid: baseColor.supplement.darkergreen,
    white: baseColor.primary.black,
  },
  screen: {
    background: {
      default: baseColor.neutral.grey5,
      settings: baseColor.neutral.grey4,
    },
  },
  text: {
    default: baseColor.primary.white,
    inverted: baseColor.primary.black,
    secondary: baseColor.neutral.grey1,
    tertiary: baseColor.neutral.grey2,
  },
}
