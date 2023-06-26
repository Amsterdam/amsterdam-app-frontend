import {VERSION} from '@env'

const parseIntRadix10 = (i: string) => parseInt(i, 10)

export const isIntegerString = (s: string) =>
  typeof s === 'string' && new RegExp(/^-?\d+$/).test(s)

export const isValidVersionString = (s?: string): s is string => {
  if (typeof s !== 'string') {
    return false
  }
  const parts = s.split('.')

  return parts.every(isIntegerString)
}

/**
 * Compare two app versions; returns 1 if version A is higher; -1 if version B is higher; 0 if equal; false if either version is invalid. The second parameter defaults to the current app version.
 */
export const versionCompare = (
  versionA: string,
  versionB = VERSION,
): 1 | 0 | -1 => {
  if (!isValidVersionString(versionA) || !isValidVersionString(versionB)) {
    throw new Error('One of the versions is not valid')
  }
  const v1: number[] = versionA.split('.').map(parseIntRadix10)
  const v2: number[] = versionB.split('.').map(parseIntRadix10)
  const k = Math.min(v1.length, v2.length)
  for (let i = 0; i < k; i++) {
    if (v1[i] > v2[i]) {
      return 1
    }
    if (v1[i] < v2[i]) {
      return -1
    }
  }
  if (v1.length === v2.length) {
    return 0
  }

  return v1.length < v2.length ? -1 : 1
}
