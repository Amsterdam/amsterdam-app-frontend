/**
 * Adds `div` tags around anchor tags and text content between them.
 *
 * This helps work around a bug in React Native where multiple nested text nodes get flattened, making inline links
 * inaccessible to screen readers. We wrap anchors and surrounding text in a div each, to allow the screen reader
 * picking them up and reading their text content and, for links, their role. We accept the extra whitespace
 * and the parts of the sentence being read out distinctly.
 * @see https://github.com/facebook/react-native/issues/32004
 * @see https://meliorence.github.io/react-native-render-html/docs/faq#some-anchors-a-are-not-accessible-to-screen-readers
 */
export const promoteInlineLinks = (html: string): string => {
  const fragments: string[] = []

  // Regular expression to match anchor tags
  const anchorRegex = /<a\b[^>]*>(.*?)<\/a>/gi

  // Find all matches of anchor tags in the HTML string
  let match
  let lastIndex = 0
  while ((match = anchorRegex.exec(html))) {
    const matchIndex = match.index
    const matchText = match[0]

    // Add the text content between the previous match and the current match
    const textBetween = html.substring(lastIndex, matchIndex)
    if (textBetween.trim() !== '') {
      fragments.push(textBetween)
    }

    fragments.push(matchText)
    lastIndex = matchIndex + matchText.length
  }

  // Add any remaining text content after the last anchor tag
  const remainingText = html.substring(lastIndex)
  if (remainingText.trim() !== '') {
    fragments.push(remainingText)
  }

  return fragments.map(fragment => `<div>${fragment.trim()}</div>`).join('')
}
