type ReplaceStringType = 'address' | 'number'

export const replaceString = (s: string, type: ReplaceStringType) => {
  switch (type) {
    case 'address':
      // eslint-disable-next-line no-useless-escape
      return s.replace(/[^\p{L}\p{N} \-\/\\.,‘’']+/gu, '')
    case 'number':
      return s.replace(/[^0-9a-zA-Z\- ]/g, '')
    default:
      return s
  }
}
