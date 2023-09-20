export enum CompareResults {
  higher = 1,
  lower = -1,
  equal = 0,
}

export const versionCompare = (
  testVersion: string,
  baseVersion: string,
): CompareResults => {
  if (testVersion === baseVersion) {
    return CompareResults.equal
  }

  const partsTest = testVersion?.split('.')
  const partsBase = baseVersion?.split('.')

  for (let i = 0; i < Math.max(partsTest.length, partsBase.length); i++) {
    const test = partsTest[i] ?? 0
    const base = partsBase[i] ?? 0

    if (test > base) {
      return CompareResults.higher
    } else if (test < base) {
      return CompareResults.lower
    }
  }

  return CompareResults.equal
}

export const isVersionHigher = (
  testVersion: string,
  baseVersion: string,
): boolean => versionCompare(testVersion, baseVersion) === CompareResults.higher

export const isVersionLower = (
  testVersion: string,
  baseVersion: string,
): boolean => versionCompare(testVersion, baseVersion) === CompareResults.lower

export const isVersionEqual = (
  testVersion: string,
  baseVersion: string,
): boolean => versionCompare(testVersion, baseVersion) === CompareResults.equal

export const isVersionHigherOrEqual = (
  testVersion: string,
  baseVersion: string,
): boolean => {
  const result = versionCompare(testVersion, baseVersion)

  return result === CompareResults.higher || result === CompareResults.equal
}

export const isVersionLowerOrEqual = (
  testVersion: string,
  baseVersion: string,
): boolean => {
  const result = versionCompare(testVersion, baseVersion)

  return result === CompareResults.lower || result === CompareResults.equal
}
