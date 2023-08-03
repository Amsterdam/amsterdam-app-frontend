import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {ListItem} from '@/components/ui/text/list/ListItem'
import {ListMarkerProp} from '@/components/ui/text/list/types'
import {TestProps} from '@/components/ui/types'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  items: string[]
} & Partial<ListMarkerProp> &
  TestProps

export const List = ({items, marker = 'square', testID}: Props) => (
  <SingleSelectable
    accessibilityLabel={accessibleText(...items)}
    testID={testID}>
    <Column gutter="md">
      {items.map(text => (
        <ListItem
          key={text}
          marker={marker}
          text={text}
        />
      ))}
    </Column>
  </SingleSelectable>
)
