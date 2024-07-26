/**
 * Group a string into n characters
 * @param str string to format
 * @param n number of characters to group into
 * @returns string
 */
export const stringGroupInto = (str: string, n: number) =>
  str.replace(new RegExp(`.{1,${n === 0 ? str.length : n}}`, 'g'), '$& ').trim()
