import {ReactNode} from 'react'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'

export const ParkingSessionDetailsRow = ({
  label,
  value,
}: {
  label: string
  value: ReactNode
}) => (
  <SingleSelectable>
    <Row>
      <Column flex={1}>
        <Phrase>{label}</Phrase>
      </Column>
      <Column flex={2}>
        <Phrase emphasis="strong">{value}</Phrase>
      </Column>
    </Row>
  </SingleSelectable>
)
