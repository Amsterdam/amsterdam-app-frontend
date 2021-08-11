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
    level2: '#F5F5F5',
    level3: '#E6E6E6',
    level4: '#B4B4B4',
    level5: '#767676',
    level6: '#323232',
    level7: '#000000',
  },
  support: {
    valid: '#00A03C',
    invalid: '#EC0000',
    focus: '#FEC813',
  },
  supplement: {
    purple: '#A00078',
    pink: '#E50082',
    orange: '#FF9100',
    yellow: '#FFE600',
    lightgreen: '#BED200',
    darkgreen: '#00A03C',
    lightblue: '#009DEC',
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
    light: baseColor.tint.level2,
    lighter: baseColor.tint.level1,
  },
  border: {
    input: baseColor.tint.level5,
  },
  font: {
    inverse: baseColor.tint.level1,
    light: baseColor.tint.level6,
    primary: baseColor.primary.main,
    regular: baseColor.tint.level7,
    secondary: baseColor.tint.level5,
  },
  touchable: {
    primary: baseColor.primary.main,
    secondary: baseColor.secondary.main,
  },
}
