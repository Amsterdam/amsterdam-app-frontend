const baseColor = {
  primary: {
    main: '#004699',
    dark: '#00387a',
  },
  secondary: {
    main: '#ec0000',
    dark: '#bc0000',
  },
  tint: {
    level1: '#ffffff',
    level2: '#f5f5f5',
    level3: '#e6e6e6',
    level4: '#b4b4b4',
    level5: '#767676',
    level6: '#323232',
    level7: '#000000',
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
  bright: {
    main: '#ffffff',
  },
  error: {
    main: '#ec0000',
  },
}

export const color = {
  background: {
    darker: baseColor.tint.level7,
    emphasis: baseColor.primary.main,
    inactive: baseColor.tint.level5,
    invalid: baseColor.support.invalid,
    light: baseColor.tint.level3,
    lighter: baseColor.tint.level1,
    lightish: baseColor.tint.level2,
  },
  border: {
    input: baseColor.tint.level5,
    inputFocus: baseColor.tint.level7,
    primary: baseColor.primary.main,
    separator: baseColor.tint.level3,
    warning: baseColor.error.main,
  },
  font: {
    inverse: baseColor.tint.level1,
    light: baseColor.tint.level6,
    primary: baseColor.primary.main,
    regular: baseColor.tint.level7,
    secondary: baseColor.tint.level5,
    tertiary: baseColor.tint.level4,
    warning: baseColor.error.main,
  },
  touchable: {
    primary: baseColor.primary.main,
    secondary: baseColor.secondary.main,
    pressed: baseColor.secondary.main,
  },
}
