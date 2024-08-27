/**
 * The base colors that can be used in the themes. The names should not convey there purposes.
 */
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
    grey6: '#9C9C9C',
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
    purple1: '#A00078',
  },
  transparent: {
    white30: '#ffffff4c',
    black90: '#000000e6',
    grey50: '#46464680',
    full: 'transparent',
  },
} as const
