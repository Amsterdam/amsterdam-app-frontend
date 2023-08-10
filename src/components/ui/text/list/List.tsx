import {useMemo} from 'react'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {ListItem} from '@/components/ui/text/list/ListItem'
import {ListMarkerProp} from '@/components/ui/text/list/types'
import {TestProps} from '@/components/ui/types'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Item = string | {accessibilityLabel: string; text: string}

const getItems = (items: Item[]) => {
  const textItems: string[] = []
  const accessibilityLabelItems: string[] = []

  for (const item of items) {
    if (typeof item === 'string') {
      textItems.push(item)
      accessibilityLabelItems.push(item)
    } else {
      textItems.push(item.text)
      accessibilityLabelItems.push(item.accessibilityLabel)
    }
  }

  return {textItems, accessibilityLabelItems}
}

type Props = {
  items: Item[]
} & Partial<ListMarkerProp> &
  TestProps

export const List = ({items, marker = 'square', testID}: Props) => {
  const {textItems, accessibilityLabelItems} = useMemo(
    () => getItems(items),
    [items],
  )

  return (
    <SingleSelectable
      accessibilityLabel={accessibleText(...accessibilityLabelItems)}
      testID={testID}>
      <Column gutter="md">
        {textItems.map(text => (
          <ListItem
            key={text}
            marker={marker}
            text={text}
          />
        ))}
      </Column>
    </SingleSelectable>
  )
}
