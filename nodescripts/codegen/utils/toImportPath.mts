import path from 'node:path'

export const toImportPath = (from: string, to: string) => {
  let rel = path.relative(from, to).replaceAll('\\', '/')

  if (!rel.startsWith('.')) {
    rel = './' + rel
  }

  return rel.replace(/\.ts$/, '')
}
