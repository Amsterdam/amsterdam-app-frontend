export const clipText = (text: string = '', separators: string[]) => {
  let clippedText = text
  separators.map(separator => {
    const pos = clippedText.indexOf(separator)
    if (pos > -1) {
      clippedText = clippedText.substr(0, pos)
    }
  })
  return clippedText
}
