import {toImportPath} from './toImportPath.mts'

describe('toImportPath', () => {
  it('returns relative path with ./ for same directory', () => {
    expect(toImportPath('/a/b', '/a/b/file.ts')).toBe('./file')
  })

  it('returns relative path with ./ for subdirectory', () => {
    expect(toImportPath('/a', '/a/b/file.ts')).toBe('./b/file')
  })

  it('returns relative path with ../ for parent directory', () => {
    expect(toImportPath('/a/b', '/a/file.ts')).toBe('../file')
  })

  it('removes .ts extension', () => {
    expect(toImportPath('/a', '/a/b/c.ts')).toBe('./b/c')
  })

  it('returns correct path for deeply nested directories', () => {
    expect(toImportPath('/a/b/c', '/a/d/e/file.ts')).toBe('../../d/e/file')
  })

  it('does not add ./ if already present', () => {
    expect(toImportPath('/a', '/a/file.ts')).toBe('./file')
  })
})
