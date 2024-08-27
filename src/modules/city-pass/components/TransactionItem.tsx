import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'

export type TransactionItemProps = {
  accessibilityLabel: string
  amountFormatted: string
  description?: string
  id: string
  title: string
}

export const TransactionItem = ({
  accessibilityLabel,
  amountFormatted,
  description,
  title,
}: TransactionItemProps) => (
  <Column>
    <Row align="between">
      <Phrase
        emphasis="strong"
        testID="">
        {title}
      </Phrase>
      <Phrase
        accessibilityLabel={accessibilityLabel}
        emphasis="strong"
        testID="">
        {amountFormatted}
      </Phrase>
    </Row>
    {!!description && <Paragraph>{description}</Paragraph>}
  </Column>
)
