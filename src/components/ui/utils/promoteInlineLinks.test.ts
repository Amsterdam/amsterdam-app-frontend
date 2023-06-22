import {promoteInlineLinks} from './promoteInlineLinks'

describe('promoteInlineLinks', () => {
  it('should wrap anchor tags in divs and preserve other content', () => {
    const html =
      "<a href='https://example.com'>Link 1</a> Some text <a href='https://example.org'>Link 2</a> More text <a href='https://example.net'>Link 3</a>"
    const expected =
      "<div><a href='https://example.com'>Link 1</a></div><div>Some text</div><div><a href='https://example.org'>Link 2</a></div><div>More text</div><div><a href='https://example.net'>Link 3</a></div>"

    const result = promoteInlineLinks(html)

    expect(result).toEqual(expected)
  })

  it('should wrap anchor tag without surrounding whitespace', () => {
    const html = "<a href='https://example.com'>Link</a>"
    const expected = "<div><a href='https://example.com'>Link</a></div>"

    const result = promoteInlineLinks(html)

    expect(result).toEqual(expected)
  })

  it('should handle a tag inside the links', () => {
    const html =
      "Some text <a href='https://example.com'><strong>Link</strong></a>"
    const expected =
      "<div>Some text</div><div><a href='https://example.com'><strong>Link</strong></a></div>"

    const result = promoteInlineLinks(html)

    expect(result).toEqual(expected)
  })

  it('should preserve leading and trailing whitespace in text content', () => {
    const html = '   Some text   '
    const expected = '<div>Some text</div>'

    const result = promoteInlineLinks(html)

    expect(result).toEqual(expected)
  })

  it('should handle empty input', () => {
    const html = ''
    const expected = ''

    const result = promoteInlineLinks(html)

    expect(result).toEqual(expected)
  })

  it('should handle input with no anchor tags', () => {
    const html = 'Some text <b>bold</b> <i>italic</i>'
    const expected = '<div>Some text <b>bold</b> <i>italic</i></div>'

    const result = promoteInlineLinks(html)

    expect(result).toEqual(expected)
  })
})
