import {ReactNode} from 'react'
import {Column} from '@/components/ui/layout/Column'
import {ListItem} from '@/components/ui/text/list/ListItem'
import {ListMarkerProp} from '@/components/ui/text/list/types'
import {type TestProps} from '@/components/ui/types'

type Props = {
  accessibilityLanguage?: string
  items: (string | ReactNode)[]
} & Partial<ListMarkerProp> &
  TestProps

export const List = ({items, marker = 'square', testID}: Props) => (
  <Column gutter="md">
    {items.map((text, index) => (
      <ListItem
        key={String(text)}
        marker={marker}
        testID={`${testID}${index}Item`}
        text={text}
      />
    ))}
  </Column>
)
