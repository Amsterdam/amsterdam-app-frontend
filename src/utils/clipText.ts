export const clipText = (text = '', separators: string[] = []) => {
  let clippedText = text
  separators.forEach(separator => {
    const pos = clippedText.indexOf(separator)
    if (pos > -1) {
      clippedText = clippedText.substr(0, pos)
    }
  })
  return clippedText
}
