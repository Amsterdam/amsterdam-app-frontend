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
    valid: '#00a03c',
    invalid: '#ec0000',
    focus: '#fec813',
  },
  supplement: {
    purple: '#a00078',
    pink: '#e50082',
    orange: '#ff9100',
    yellow: '#ffe600',
    lightgreen: '#bed200',
    darkgreen: '#00a03c',
    lightblue: '#009dec',
  },
}

export const color = {
  background: {
    darker: baseColor.primary.black,
    emphasis: baseColor.primary.darkblue,
    inactive: baseColor.neutral.grey4,
    invalid: baseColor.support.invalid,
    light: baseColor.neutral.grey2,
    lighter: baseColor.primary.white,
    lightish: baseColor.neutral.grey1,
  },
  border: {
    default: baseColor.neutral.grey2,
    input: baseColor.neutral.grey4,
    inputFocus: baseColor.primary.black,
    invalid: baseColor.support.invalid,
    primary: baseColor.primary.darkblue,
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
  touchable: {
    primary: baseColor.primary.darkblue,
    secondary: baseColor.primary.red,
    pressed: baseColor.primary.red,
  },
}
