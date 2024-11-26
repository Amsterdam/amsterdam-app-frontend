import {type ReactNode} from 'react'

export const parseTextToComponentsForLinks = (
  text: string,
  render: (part: string) => ReactNode,
  textRender: (part: string) => ReactNode = part => part,
): ReactNode[] => {
  const urlRegex = /((?:(?:https?:\/\/)|(?:www.))[^\s]+)/g
  const parts = text.split(urlRegex)

  return parts
    .filter(part => part.length > 0)
    .map(part => {
      if (urlRegex.test(part)) {
        return render(part.startsWith('http') ? part : `http://${part}`)
      }

      return textRender(part)
    })
}
