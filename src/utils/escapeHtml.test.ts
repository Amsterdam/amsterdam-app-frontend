import {escapeHtml, unescapeHtml} from '@/utils/escapeHtml'

describe('escapeHtml', () => {
  test('escapes & to &amp;', () => {
    expect(escapeHtml('&')).toBe('&amp;')
  })

  test('escapes < to &lt;', () => {
    expect(escapeHtml('<')).toBe('&lt;')
  })

  test('escapes > to &gt;', () => {
    expect(escapeHtml('>')).toBe('&gt;')
  })

  test('escapes " to &quot;', () => {
    expect(escapeHtml('"')).toBe('&quot;')
  })

  test("escapes ' to &#039;", () => {
    expect(escapeHtml("'")).toBe('&#039;')
  })

  test('escapes a string with multiple characters', () => {
    const input = '<div class="test">Hello & welcome!</div>'
    const expected =
      '&lt;div class=&quot;test&quot;&gt;Hello &amp; welcome!&lt;/div&gt;'

    expect(escapeHtml(input)).toBe(expected)
  })
})

describe('unescapeHtml', () => {
  test('unescapes &amp; to &', () => {
    expect(unescapeHtml('&amp;')).toBe('&')
  })

  test('unescapes &lt; to <', () => {
    expect(unescapeHtml('&lt;')).toBe('<')
  })

  test('unescapes &gt; to >', () => {
    expect(unescapeHtml('&gt;')).toBe('>')
  })

  test('unescapes &quot; to "', () => {
    expect(unescapeHtml('&quot;')).toBe('"')
  })

  test("unescapes &#039; to '", () => {
    expect(unescapeHtml('&#039;')).toBe("'")
  })

  test('unescapes a string with multiple entities', () => {
    const input =
      '&lt;div class=&quot;test&quot;&gt;Hello &amp; welcome!&lt;/div&gt;'
    const expected = '<div class="test">Hello & welcome!</div>'

    expect(unescapeHtml(input)).toBe(expected)
  })
})
