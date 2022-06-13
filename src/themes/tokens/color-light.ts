import {baseColor} from '../../tokens'

export type ColorTokens = typeof lightColorTokens

// TODO OMG Improve background tokens
export const lightColorTokens = {
  background: {
    cutout: baseColor.primary.white,
    inverted: baseColor.neutral.grey5,
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
    navigation: baseColor.primary.darkblue,
    pressed: {
      background: baseColor.custom.grey1,
    },
  },
  screen: {
    background: {
      default: baseColor.primary.white,
      settings: baseColor.custom.grey1,
    },
  },
  text: {
    default: baseColor.primary.black,
    inverted: baseColor.primary.white,
    secondary: baseColor.neutral.grey4,
    tertiary: baseColor.neutral.grey3,
  },
}
