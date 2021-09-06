/**
 * Capitalises the first letter of the string and adds a period.
 * @param text
 */
export const formatSentence = (text: string): string => {
  let sentence = text?.[0].toUpperCase() + text?.slice(1)

  if (!['.', '?', '!'].includes(sentence[sentence.length - 1])) {
    sentence += '.'
  }

  return sentence
}
