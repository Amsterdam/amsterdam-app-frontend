const baseColor = {
  primary: {
    black: '#000000',
    darkblue: '#004699',
    red: '#ec0000',
    white: '#ffffff',
  },
  neutral: {
    grey1: '#f5f5f5',
    grey2: '#e6e6e6',
    grey3: '#b4b4b4',
    grey4: '#767676',
    grey5: '#323232',
  },
  support: {
    focus: '#fec813',
    invalid: '#ec0000',
    valid: '#00a03c',
  },
  supplement: {
    darkgreen: '#00a03c',
    lightblue: '#009dec',
    lightgreen: '#bed200',
    orange: '#ff9100',
    pink: '#e50082',
    purple: '#a00078',
    yellow: '#ffe600',
  },
}

export const color = {
  background: {
    app: baseColor.neutral.grey2,
    darker: baseColor.primary.black,
    emphasis: baseColor.primary.darkblue,
    grey: baseColor.neutral.grey1,
    inactive: baseColor.neutral.grey4,
    invalid: baseColor.support.invalid,
    white: baseColor.primary.white,
  },
  border: {
    default: baseColor.neutral.grey2,
    divider: baseColor.neutral.grey3,
    onGrey: baseColor.neutral.grey3,
    input: baseColor.neutral.grey4,
    inputFocus: baseColor.primary.black,
    invalid: baseColor.support.invalid,
    primary: baseColor.primary.darkblue,
  },
  checkbox: {
    background: {
      checked: baseColor.primary.black,
      default: baseColor.primary.white,
    },
  },
  font: {
    invalid: baseColor.support.invalid,
    inverse: baseColor.primary.white,
    light: baseColor.neutral.grey5,
    primary: baseColor.primary.darkblue,
    regular: baseColor.primary.black,
    secondary: baseColor.neutral.grey4,
    tertiary: baseColor.neutral.grey3,
  },
  state: {
    invalid: baseColor.support.invalid,
    neutral: baseColor.neutral.grey4,
    valid: baseColor.support.valid,
  },
  touchable: {
    pressed: baseColor.primary.red,
    primary: baseColor.primary.darkblue,
    secondary: baseColor.primary.red,
  },
}
