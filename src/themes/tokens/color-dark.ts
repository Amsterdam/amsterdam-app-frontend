import {baseColor} from '../../tokens'
import {ColorTokens} from './color-light'

// TODO Implement dark mode properly
export const darkColorTokens: ColorTokens = {
  background: {
    cutout: baseColor.primary.black,
    inverted: baseColor.neutral.grey1,
  },
  box: {
    background: {
      emphasis: baseColor.primary.darkblue,
      grey: baseColor.neutral.grey1,
      invalid: baseColor.support.invalid,
      white: baseColor.primary.white,
    },
  },
  pressable: {
    default: {
      background: baseColor.primary.darkblue,
    },
    pressed: {
      background: baseColor.neutral.grey5,
    },
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
