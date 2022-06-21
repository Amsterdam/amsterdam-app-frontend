import {baseColor} from '../../tokens'
import {ColorTokens} from './color-light'

// TODO Implement dark mode properly
export const darkColorTokens: ColorTokens = {
  background: {
    cutout: baseColor.primary.black,
    emphasis: baseColor.primary.darkblue,
    inactive: baseColor.neutral.grey4,
    inverted: baseColor.neutral.grey1,
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
      background: baseColor.neutral.grey5,
    },
  },
  screen: {
    background: {
      default: baseColor.neutral.grey5,
      settings: baseColor.neutral.grey4,
    },
  },
  severity: {
    positive: baseColor.support.valid,
    negative: baseColor.support.invalid,
    positiveDark: baseColor.supplement.darkergreen,
  },
  text: {
    default: baseColor.primary.white,
    inverted: baseColor.primary.black,
    secondary: baseColor.neutral.grey1,
    tertiary: baseColor.neutral.grey2,
  },
}
