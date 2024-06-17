const dictionary: Record<string, string> = {
  'gfe/t': 'gé-ef-e-tee',
  't/m': 'tot en met',
}

/**
 * Makes a word lowercase and removes all of the following characters: ()
 */
export const wordCleanup = (text: string) =>
  text.toLowerCase().replaceAll(/[()]/g, '')

export const abbreviationsPronounce = (text: string) =>
  text
    .split(' ')
    .map((word: string) => dictionary[wordCleanup(word)] || word)
    .join(' ')
