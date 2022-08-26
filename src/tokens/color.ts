export const baseColor = {
  primary: {
    black: '#000000',
    blue: '#004699',
    red: '#ec0000',
    white: '#ffffff',
  },
  functional: {
    darkblue: '#00387a',
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
  secondary: {
    darkgreen: '#00a03c',
    blue: '#009dec',
    lightgreen: '#bed200',
    orange: '#ff9100',
    magenta: '#e50082',
    purple: '#a00078',
    yellow: '#ffe600',
  },
  custom: {
    grey1: '#f3f5f7',
  },
}

/**
 * @deprecated Use `theme` instead.
 */
export const color = {
  background: {
    app: baseColor.neutral.grey2,
    darker: baseColor.primary.black,
    emphasis: baseColor.primary.blue,
    grey: baseColor.neutral.grey1,
    inactive: baseColor.neutral.grey4,
    invalid: baseColor.support.invalid,
    white: baseColor.primary.white,
  },
  border: {
    default: baseColor.neutral.grey2,
    onGrey: baseColor.neutral.grey3,
    invalid: baseColor.support.invalid,
    primary: baseColor.primary.blue,
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
  font: {
    invalid: baseColor.support.invalid,
    inverse: baseColor.primary.white,
    primary: baseColor.primary.blue,
    regular: baseColor.primary.black,
    secondary: baseColor.neutral.grey4,
    tertiary: baseColor.neutral.grey3,
  },
  status: {
    error: baseColor.support.invalid,
    success: baseColor.support.valid,
  },
  touchable: {
    pressed: baseColor.primary.red,
    primary: baseColor.primary.blue,
    secondary: baseColor.primary.red,
  },
}
