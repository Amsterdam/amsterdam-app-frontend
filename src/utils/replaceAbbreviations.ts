const dictionary: Record<string, string> = {
  't/m': 'tot en met',
}

export const replaceAbbreviations = (text: string) =>
  text
    .split(' ')
    .map((word: string) => dictionary[word.toLowerCase()] || word)
    .join(' ')
