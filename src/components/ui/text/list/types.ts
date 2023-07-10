export enum ListMarkerGlyph {
  checkmark = '\u221a',
  square = '\u2022',
}

export type ListMarkerProp = {
  marker: keyof typeof ListMarkerGlyph
}
