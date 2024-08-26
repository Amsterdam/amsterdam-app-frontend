export enum ListMarkerGlyph {
  'check-mark' = '\u221a',
  square = '\u2022',
}

export type ListMarkerProp = {
  marker: keyof typeof ListMarkerGlyph
}
