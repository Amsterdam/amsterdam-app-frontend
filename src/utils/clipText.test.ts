import {clipText} from './clipText' // Import your module

describe('clipText', () => {
  it('should return the same text when no separators are provided', () => {
    const text = 'Hello, World!'
    const result = clipText(text)

    expect(result).toBe(text)
  })

  it('should clip the text at the first occurrence of a separator', () => {
    const text = 'apple, banana, cherry'
    const separators = [',']
    const result = clipText(text, separators)

    expect(result).toBe('apple')
  })

  it('should clip the text at the first occurrence of any separator', () => {
    const text = 'apple; banana, cherry'
    const separators = [',', ';']
    const result = clipText(text, separators)

    expect(result).toBe('apple')
  })

  it('should return an empty string when the text is empty', () => {
    const text = ''
    const separators = [',']
    const result = clipText(text, separators)

    expect(result).toBe('')
  })

  it('should return an empty string when no text and separators are provided', () => {
    const result = clipText()

    expect(result).toBe('')
  })

  it('should handle multiple separators in a row', () => {
    const text = 'apple,,banana'
    const separators = [',']
    const result = clipText(text, separators)

    expect(result).toBe('apple')
  })

  it('should handle separators that are not in the text', () => {
    const text = 'apple banana cherry'
    const separators = [',']
    const result = clipText(text, separators)

    expect(result).toBe(text)
  })
})
