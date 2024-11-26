import renderer from 'react-test-renderer'
import {parseTextToComponentsForLinks} from '@/utils/parseTextToComponentsForLinks'

describe('parseTextToComponentsForLinks', () => {
  const renderLink = (part: string) => <a href={part}>{part}</a>
  const renderText = (part: string) => <span>{part}</span>

  it('should return plain text when there are no URLs', () => {
    const text = 'This is a test message without URLs.'
    const result = parseTextToComponentsForLinks(text, renderLink, renderText)
    const tree = renderer.create(<>{result}</>).toJSON()

    expect(tree).toEqual({
      type: 'span',
      props: {},
      children: ['This is a test message without URLs.'],
    })
  })

  it('should wrap a single URL in an anchor tag', () => {
    const text = 'Check this link: https://example.com'
    const result = parseTextToComponentsForLinks(text, renderLink, renderText)
    const tree = renderer.create(<>{result}</>).toJSON()

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
    const tree = renderer.create(<>{result}</>).toTree()

    expect(tree).toEqual([
      {
        instance: null,
        nodeType: 'host',
        props: {
          children: 'Check this link: ',
        },
        rendered: ['Check this link: '],
        type: 'span',
      },
      {
        instance: null,
        nodeType: 'host',
        props: {
          children: 'http://www.example.com',
          href: 'http://www.example.com',
        },
        rendered: ['http://www.example.com'],
        type: 'a',
      },
    ])
  })

  it('should wrap multiple URLs in anchor tags', () => {
    const text =
      'Visit https://example.com and https://another.com for more info.'
    const result = parseTextToComponentsForLinks(text, renderLink, renderText)
    const tree = renderer.create(<>{result}</>).toJSON()

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
    const tree = renderer.create(<>{result}</>).toTree()

    expect(tree).toEqual([
      {
        type: 'span',
        instance: null,
        nodeType: 'host',
        props: {children: 'Visit '},
        rendered: ['Visit '],
      },
      {
        type: 'a',
        instance: null,
        nodeType: 'host',
        props: {href: 'https://example.com', children: 'https://example.com'},
        rendered: ['https://example.com'],
      },
      {
        type: 'span',
        instance: null,
        nodeType: 'host',
        props: {children: ' and '},
        rendered: [' and '],
      },
      {
        type: 'a',
        instance: null,
        nodeType: 'host',
        props: {
          href: 'http://www.another.com',
          children: 'http://www.another.com',
        },
        rendered: ['http://www.another.com'],
      },
      {
        type: 'span',
        instance: null,
        nodeType: 'host',
        props: {children: ' for more info.'},
        rendered: [' for more info.'],
      },
    ])
  })
})
