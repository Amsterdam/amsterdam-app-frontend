import type {ImportConfig} from '../types.mts'

export const sortImportNames = (
  {import: a}: ImportConfig,
  {import: b}: ImportConfig,
) => {
  if (a === b) {
    return 0
  }

  if (a === 'default') {
    return -1
  }

  if (b === 'default') {
    return 1
  }

  if (a === 'namespace') {
    return -1
  }

  if (b === 'namespace') {
    return 1
  }

  return a.localeCompare(b)
}
