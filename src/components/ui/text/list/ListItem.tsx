import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {ListItemMarker} from '@/components/ui/text/list/ListItemMarker'
import {ListMarkerProp} from '@/components/ui/text/list/types'
import {type TestProps} from '@/components/ui/types'

type Props = {
  text: string
} & ListMarkerProp &
  TestProps

export const ListItem = ({text, marker, testID}: Props) => (
  <Row>
    <ListItemMarker
      marker={marker}
      testID={`${testID}Marker`}
    />
    <Phrase testID={testID}>{text}</Phrase>
  </Row>
)
