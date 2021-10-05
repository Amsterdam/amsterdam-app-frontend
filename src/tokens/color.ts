const baseColor = {
  primary: {
    black: '#000000',
    darkblue: '#004699',
    red: '#ec0000',
    white: '#ffffff',
  },
  tint: {
    level2: '#f5f5f5',
    level3: '#e6e6e6',
    level4: '#b4b4b4',
    level5: '#767676',
    level6: '#323232',
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
    inactive: baseColor.tint.level5,
    invalid: baseColor.support.invalid,
    light: baseColor.tint.level3,
    lighter: baseColor.primary.white,
    lightish: baseColor.tint.level2,
  },
  border: {
    default: baseColor.tint.level3,
    input: baseColor.tint.level5,
    inputFocus: baseColor.primary.black,
    invalid: baseColor.support.invalid,
    primary: baseColor.primary.darkblue,
  },
  font: {
    invalid: baseColor.support.invalid,
    inverse: baseColor.primary.white,
    light: baseColor.tint.level6,
    primary: baseColor.primary.darkblue,
    regular: baseColor.primary.black,
    secondary: baseColor.tint.level5,
    tertiary: baseColor.tint.level4,
  },
  touchable: {
    primary: baseColor.primary.darkblue,
    secondary: baseColor.primary.red,
    pressed: baseColor.primary.red,
  },
}
