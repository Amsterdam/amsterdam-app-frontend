import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'

type Props = {
  testID: string
  text: string
}

export const ErrorMessage = ({text, testID}: Props) => (
  <Row gutter="sm">
    <Icon
      color="warning"
      name="alert"
      size="md"
    />
    <Paragraph
      color="warning"
      testID={testID}>
      {text}
    </Paragraph>
  </Row>
)
