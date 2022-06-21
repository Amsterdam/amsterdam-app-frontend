import {baseColor} from '../../tokens'

export type ColorTokens = typeof lightColorTokens

// TODO OMG Improve background tokens
export const lightColorTokens = {
  background: {
    cutout: baseColor.primary.white,
    emphasis: baseColor.primary.darkblue,
    inactive: baseColor.neutral.grey4,
    inverted: baseColor.neutral.grey5,
  },
  border: {
    default: baseColor.neutral.grey2,
    divider: baseColor.neutral.grey3,
    onGrey: baseColor.neutral.grey3,
    invalid: baseColor.support.invalid,
    primary: baseColor.primary.darkblue,
  },
  box: {
    background: {
      alert: baseColor.supplement.yellow,
      emphasis: baseColor.primary.darkblue,
      grey: baseColor.neutral.grey1,
      invalid: baseColor.support.invalid,
      white: baseColor.primary.white,
    },
  },
  control: {
    default: {
      background: baseColor.primary.white,
      border: baseColor.neutral.grey4,
    },
    checked: {
      background: baseColor.primary.black,
      border: baseColor.primary.black,
    },
    focus: {
      border: baseColor.primary.black,
    },
    switch: {
      background: baseColor.neutral.grey4,
      off: baseColor.neutral.grey4,
      on: baseColor.support.valid,
    },
    warning: {
      border: baseColor.support.invalid,
    },
  },
  pressable: {
    default: {
      background: baseColor.primary.darkblue,
    },
    secondary: {
      background: baseColor.primary.red,
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
  severity: {
    positive: baseColor.support.valid,
    negative: baseColor.support.invalid,
    positiveDark: baseColor.supplement.darkergreen,
  },
  text: {
    default: baseColor.primary.black,
    inverted: baseColor.primary.white,
    secondary: baseColor.neutral.grey4,
    tertiary: baseColor.neutral.grey3,
  },
}
