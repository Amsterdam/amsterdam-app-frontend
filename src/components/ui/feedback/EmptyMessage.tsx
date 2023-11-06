import {useLayoutEffect} from 'react'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {TestProps} from '@/components/ui/types'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  showTitle?: boolean
  text: string
} & TestProps

export const EmptyMessage = ({showTitle = true, testID, text}: Props) => {
  const title = showTitle ? 'Helaas …' : ''
  const a11yAnnounce = useAccessibilityAnnounce({
    focusDelay: 'normal',
    queue: true,
  })

  useLayoutEffect(() => {
    a11yAnnounce(title + text)
  }, [a11yAnnounce, text, title])

  return (
    <SingleSelectable
      accessibilityLabel={accessibleText(title, text)}
      accessibilityLanguage="nl-NL">
      {!!showTitle && (
        <Title
          level="h3"
          testID={testID}
          text={title}
        />
      )}
      <Paragraph>{text}</Paragraph>
    </SingleSelectable>
  )
}
