import {render} from '@testing-library/react-native'
import {parseTextToComponentsForLinks} from '@/utils/parseTextToComponentsForLinks'

describe('parseTextToComponentsForLinks', () => {
  const renderLink = (part: string) => (
    <a
      href={part}
      key={part}>
      {part}
    </a>
  )
  const renderText = (part: string) => <span key={part}>{part}</span>

  it('should return plain text when there are no URLs', () => {
    const text = 'This is a test message without URLs.'
    const result = parseTextToComponentsForLinks(text, renderLink, renderText)
    const tree = render(<>{result}</>).toJSON()

    expect(tree).toEqual({
      type: 'span',
      props: {},
      children: ['This is a test message without URLs.'],
    })
  })

  it('should wrap a single URL in an anchor tag', () => {
    const text = 'Check this link: https://example.com'
    const result = parseTextToComponentsForLinks(text, renderLink, renderText)
    const tree = render(<>{result}</>).toJSON()

    expect(tree).toEqual([
      {type: 'span', props: {}, children: ['Check this link: ']},
      {
        type: 'a',
        props: {href: 'https://example.com'},
        children: ['https://example.com'],
      },
    ])
  })
  it('should wrap a single URL starting with www. in an anchor tag', () => {
    const text = 'Check this link: www.example.com'
    const result = parseTextToComponentsForLinks(text, renderLink, renderText)
    const tree = render(<>{result}</>).toJSON()

    expect(tree).toEqual([
      {
        props: {},
        children: ['Check this link: '],
        type: 'span',
      },
      {
        props: {
          href: 'http://www.example.com',
        },
        children: ['http://www.example.com'],
        type: 'a',
      },
    ])
  })

  it('should wrap multiple URLs in anchor tags', () => {
    const text =
      'Visit https://example.com and https://another.com for more info.'
    const result = parseTextToComponentsForLinks(text, renderLink, renderText)
    const tree = render(<>{result}</>).toJSON()

    expect(tree).toEqual([
      {type: 'span', props: {}, children: ['Visit ']},
      {
        type: 'a',
        props: {href: 'https://example.com'},
        children: ['https://example.com'],
      },
      {type: 'span', props: {}, children: [' and ']},
      {
        type: 'a',
        props: {href: 'https://another.com'},
        children: ['https://another.com'],
      },
      {type: 'span', props: {}, children: [' for more info.']},
    ])
  })
  it('should wrap multiple URLs in anchor tags with www.', () => {
    const text = 'Visit https://example.com and www.another.com for more info.'
    const result = parseTextToComponentsForLinks(text, renderLink, renderText)
    const tree = render(<>{result}</>).toJSON()

    expect(tree).toEqual([
      {type: 'span', props: {}, children: ['Visit ']},
      {
        type: 'a',
        props: {href: 'https://example.com'},
        children: ['https://example.com'],
      },
      {type: 'span', props: {}, children: [' and ']},
      {
        type: 'a',
        // eslint-disable-next-line sonarjs/no-clear-text-protocols
        props: {href: 'http://www.another.com'},
        // eslint-disable-next-line sonarjs/no-clear-text-protocols
        children: ['http://www.another.com'],
      },
      {type: 'span', props: {}, children: [' for more info.']},
    ])
  })
})
