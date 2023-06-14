import {wrapAnchorsInParagraphs} from './wrapAnchorsInParagraphs'

describe('wrapAnchorsInParagraphs', () => {
  it('should wrap anchor tags in paragraphs and preserve other content', () => {
    const html =
      "<a href='https://example.com'>Link 1</a> Some text <a href='https://example.org'>Link 2</a> More text <a href='https://example.net'>Link 3</a>"
    const expected =
      "<p><a href='https://example.com'>Link 1</a></p><p>Some text</p><p><a href='https://example.org'>Link 2</a></p><p>More text</p><p><a href='https://example.net'>Link 3</a></p>"

    const result = wrapAnchorsInParagraphs(html)

    expect(result).toEqual(expected)
  })

  it('should wrap anchor tag without surrounding whitespace', () => {
    const html = "<a href='https://example.com'>Link</a>"
    const expected = "<p><a href='https://example.com'>Link</a></p>"

    const result = wrapAnchorsInParagraphs(html)

    expect(result).toEqual(expected)
  })

  it('should handle a tag inside the links', () => {
    const html =
      "Some text <a href='https://example.com'><strong>Link</strong></a>"
    const expected =
      "<p>Some text</p><p><a href='https://example.com'><strong>Link</strong></a></p>"

    const result = wrapAnchorsInParagraphs(html)

    expect(result).toEqual(expected)
  })

  it('should preserve leading and trailing whitespace in text content', () => {
    const html = '   Some text   '
    const expected = '<p>Some text</p>'

    const result = wrapAnchorsInParagraphs(html)

    expect(result).toEqual(expected)
  })

  it('should handle empty input', () => {
    const html = ''
    const expected = ''

    const result = wrapAnchorsInParagraphs(html)

    expect(result).toEqual(expected)
  })

  it('should handle input with no anchor tags', () => {
    const html = 'Some text <b>bold</b> <i>italic</i>'
    const expected = '<p>Some text <b>bold</b> <i>italic</i></p>'

    const result = wrapAnchorsInParagraphs(html)

    expect(result).toEqual(expected)
  })
})
