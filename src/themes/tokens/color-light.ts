import {baseColor} from '@/tokens'

export type ColorTokens = typeof lightColorTokens

// TODO OMG Improve background tokens
export const lightColorTokens = {
  background: {
    cutout: baseColor.primary.white,
    emphasis: baseColor.primary.blue,
    inactive: baseColor.neutral.grey4,
    inverse: baseColor.neutral.grey5,
  },
  border: {
    default: baseColor.neutral.grey2,
    onGrey: baseColor.neutral.grey3,
    invalid: baseColor.support.invalid,
    primary: baseColor.primary.blue,
  },
  box: {
    background: {
      alert: baseColor.secondary.yellow,
      black: baseColor.primary.black,
      emphasis: baseColor.primary.blue,
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
      background: baseColor.primary.blue,
      border: baseColor.primary.blue,
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
      background: baseColor.primary.blue,
    },
    primary: {
      default: baseColor.primary.blue,
      highlight: baseColor.functional.darkblue,
    },
    secondary: {
      background: baseColor.primary.red,
    },
    tertiary: {
      default: baseColor.primary.white,
      highlight: baseColor.custom.grey1,
    },
    negative: {
      default: baseColor.primary.red,
      highlight: baseColor.primary.red,
    },
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
  },
  text: {
    default: baseColor.primary.black,
    inverse: baseColor.primary.white,
    link: baseColor.primary.blue,
    secondary: baseColor.neutral.grey4,
    tertiary: baseColor.neutral.grey3,
    warning: baseColor.support.invalid,
  },
}
