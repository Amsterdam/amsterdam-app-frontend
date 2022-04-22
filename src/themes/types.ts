export type Theme = {
  id: string
  color: ColorTheme
}

export type ColorTheme = {
  screen: {
    background: string
  }
  text: {
    default: string
    inverted: string
  }
}
