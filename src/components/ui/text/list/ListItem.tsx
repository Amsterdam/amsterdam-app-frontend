import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {ListItemMarker} from '@/components/ui/text/list/ListItemMarker'
import {ListMarkerProp} from '@/components/ui/text/list/types'

type Props = {
  text: string
} & ListMarkerProp

export const ListItem = ({text, marker}: Props) => (
  <Row>
    <ListItemMarker marker={marker} />
    <Phrase>{text}</Phrase>
  </Row>
)
