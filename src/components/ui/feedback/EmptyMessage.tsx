import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {TestProps} from '@/components/ui/types'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  text: string
} & TestProps

export const EmptyMessage = ({testID, text}: Props) => {
  const title = 'Helaas …'

  return (
    <SingleSelectable accessibilityLabel={accessibleText(title, text)}>
      <Title
        level="h3"
        testID={testID}
        text={title}
      />
      <Paragraph>{text}</Paragraph>
    </SingleSelectable>
  )
}
