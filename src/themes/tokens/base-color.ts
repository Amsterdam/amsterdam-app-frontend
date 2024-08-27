/**
 * The base colors that can be used in the themes. The names should not convey there purposes.
 */
export const baseColor = {
  primary: {
    black: '#000000', // DS: Content/Main
    blue: '#004699',
    red: '#ec0000',
    white: '#ffffff', // DS: Content/Main
  },
  functional: {
    /**
     * Design system name: Interaction/Hover
     */
    darkblue: '#102E62',
  },
  neutral: {
    grey1: '#E8E8E8',
    grey2: '#BEBEBE',
    grey3: '#767676',
    grey4: '#323232',
  },
  support: {
    invalid: '#ec0000', // weg, is hetzelfde als primary rood
    valid: '#00a03c', // weg ->  gebruik secondary.darkgreen
  },
  secondary: {
    darkgreen: '#00a03c', // deze blijft
    lightgreen: '#bed200',
    orange: '#ff9100',
    magenta: '#e50082',
    purple: '#a00078',
    yellow: '#ffe600', // Attention
  },
  custom: {
    grey0: '#f3f5f7', // weg? -> wordt huidige grey1, behalve bij settings
    purple1: '#A00078',
  },
  transparent: {
    white30: '#ffffff4c',
    black90: '#000000e6',
    grey50: '#46464680',
    full: 'transparent',
  },
} as const
