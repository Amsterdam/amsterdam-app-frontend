export const shallowEqual = (
  object1: Record<string, unknown>,
  object2: Record<string, unknown>,
) => {
  if (!object1 || !object2) {
    return false
  }
  if (typeof object1 !== 'object' || typeof object2 !== 'object') {
    return false
  }

  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false
    }
  }

  return true
}
