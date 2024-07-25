export const pronounceCharacters = (value: number | string): string =>
  (value ?? '').toString().split('').join(' ')
