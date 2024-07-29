/**
 * Group a string into n characters
 * @param str string to format
 * @param n number of characters to group into
 * @returns string
 */
export const stringGroupInto = (str: string, n: number) => {
  if (!str) {
    return ''
  }

  if (!n) {
    return str
  }

  return str.replace(new RegExp(`.{1,${n}}`, 'g'), '$& ').trim()
}
